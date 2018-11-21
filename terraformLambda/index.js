var child_process = require('child_process');
var aws           = require('aws-sdk');
var fs            = require('fs-extra');
var path          = require('path')
var s3            = new aws.S3();

exports.handler = async(event) => {

  var logEvents = {};
  
  return new Promise(async (resolve, reject) => {
    
    //Log all invocation parameters
    logEvents.event                = event;
    logEvents.infrastructureBucket = process.env['INFRA_BUCKET'];
    logEvents.stateBucket          = process.env['STATE_BUCKET'];
    logEvents.terraformLog         = [];

    //List bucket contents
    var awsBucketContents = await s3.listObjects({
      Bucket: process.env['INFRA_BUCKET']
    }).promise();

    //Iterate keys
    for(let i = 0; i < awsBucketContents.Contents.length; i++) {
      
      //Ignore folder keys
      if(awsBucketContents.Contents[i].Key.endsWith('/'))
        continue;

      //Download file
      await downloadFile(process.env['INFRA_BUCKET'], awsBucketContents.Contents[i].Key);
    }

    //Construct apply command
    var terraformBinary = (event.local != undefined && event.local == true) ? 'terraformLocal' : 'terraform';
    var terraformPath   = path.resolve('bin/' + terraformBinary);

    try {
      var initResult = await terraform(terraformPath, 'init', '');
      var planResult = await terraform(terraformPath, 'plan', '');
    } catch(e) {
      console.log(e);
    }
    
    resolve(initResult, planResult);
  });
};

function stripNonASCII(buffer) {
  //Convert buffer to string
  var parsedString = buffer.toString('utf8');

  //Replace newlines with spaces
  parsedString = parsedString.replace(/\n/g, ' ');

  //Remove escaped unicode
  parsedString = parsedString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
  
  //Remove console control characters
  parsedString = parsedString.replace(/\[\d*m/g, '');

  //Return trimmed string
  return parsedString.trim();
}

async function downloadFile(bucket, key) {

  return new Promise(async (resolve, reject) => {
    //Construct the file path
    var filePath = '/tmp/terraform/' + key;

    //Ensure the subdirectories exist
    await fs.ensureFile(filePath);

    //Create write stream
    var writeStream = fs.createWriteStream(filePath);

    //Create read stream
    var readStream = s3.getObject({
      Bucket: bucket,
      Key: key,
    }).createReadStream();

    //Write through
    readStream.pipe(writeStream);

    resolve();
  });
}

async function terraform(binary, action, optionsString) {

  return new Promise((resolve, reject) => {

    child_process.exec(
      binary + ' ' + action,
      {cwd: '/tmp/terraform/'},
      function(error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        resolve();
    }
);
  });
}
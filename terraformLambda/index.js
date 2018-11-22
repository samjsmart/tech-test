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
    logEvents.terraformInitLog     = []
    logEvents.terraformActionLog   = [];

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

    //Construct terraform path
    var terraformBinary = (event.local != undefined && event.local == true) ? 'terraformLocal' : 'terraform';
    var terraformPath   = path.resolve('bin/' + terraformBinary);

    try {

      createTerraformBackendFile(process.env['STATE_BUCKET'], event.prefix);

      //Run the init
      var initResult  = await terraform(terraformPath, 'init', '');

      //logEvents.statePath        = 
      logEvents.terraformInitLog = logEvents.terraformInitLog.concat(initResult);

      switch(event.action) {
        case 'apply':
          var result                   = await terraform(terraformPath, 'apply', '-auto-approve -refresh=true');
          logEvents.terraformActionLog = logEvents.terraformActionLog.concat(result);
          break;
        
        case 'plan':
        case undefined:
          var result                   = await terraform(terraformPath, 'plan', '');
          logEvents.terraformActionLog = logEvents.terraformActionLog.concat(result);
          break;

        case 'destroy':
          var result                   = await terraform(terraformPath, 'destroy', '-auto-approve -refresh=true');
          logEvents.terraformActionLog = logEvents.terraformActionLog.concat(result);
          break;

        default:
          break;
      }
    } catch(e) {
      reject(e);
    }

    resolve(logEvents);
  });
};

function stripNonASCII(buffer) {
  //Convert buffer to string
  var parsedString = buffer.toString('utf8');

  //Escape newlines
  parsedString = parsedString.replace(/\n/g, '');

  //Remove escaped unicode
  parsedString = parsedString.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
  
  //Remove console control characters
  parsedString = parsedString.replace(/\[\d*m/g, '');

  //Return trimmed array of log events
  return parsedString.trim();
}

async function downloadFile(bucket, key) {

  return new Promise(async(resolve, reject) => {
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
    var stream = readStream.pipe(writeStream);
    
    //Resolve when write is complete
    stream.on('finish', function() {
      resolve();
    });

  });
}

async function terraform(binary, action, optionsString) {

  return new Promise((resolve, reject) => {
      
    var log = [];

    var proc = child_process.exec(
      binary + ' ' + action + ' ' + optionsString,
      {cwd: '/tmp/terraform/'}
    );

    proc.stdout.on('data', function(data) {
      var line = stripNonASCII(data);

      console.log(line + '\n');
      log.push(line);
    });

    proc.stderr.on('data', function(data) {
      var line = stripNonASCII(data);

      console.log(line + '\n');
      log.push(line);
    });

    proc.on('exit', function(exitCode) {
      if(exitCode)
        reject(log);
      else
        resolve(log);
    });

  });
}

function createTerraformBackendFile(bucket, prefix, region) {
  
  //Get passed region or use lambda region
  var region      = region || process.env.AWS_REGION;

  //Get the bucket prefix for the remote state
  var statePrefix = prefix || '';

  //Construct the key for the state file and remove any '//'
  var key         = (statePrefix + '/terraform.tfstate').replace(/\/\//g, '/').replace(/^(\/)/, '');

  //Construct remote state file
  var remoteStateContents = `
  terraform {
    backend "s3" {
      bucket = "` + bucket +`"
      key    = "` + key +`"
      region = "` + region +`"
    }
  }
  `
  
  //Write the file
  fs.writeFileSync('/tmp/terraform/terraform_remote_state.tf', remoteStateContents);
}
var child_process = require('child_process');

exports.handler = async(event) => {
  
  return new Promise((resolve, reject) => {
    
    var terraformCommand = 'plan';
    var terraformPath    = (event.local != undefined && event.local == true) ? './bin/terraformLocal' : './bin/terraform';

    //Spawn the terraform process
    var terraform = child_process.spawn(
      terraformPath,
      [terraformCommand],
      {stdio: 'pipe'}
    );
    
    //Stream stdout
    terraform.stdout.on('data', function(line){
      console.log(String(line));
    });

    //Stream stderr
    terraform.stderr.on('data', function(line){
      console.log(String(line));
    });

    //Stream exitcode
    terraform.on('exit', function(code){
      console.log('exitcode:', code);
      resolve();
    });
  });
};

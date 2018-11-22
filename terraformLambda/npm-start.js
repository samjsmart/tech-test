//This is a wrapper for the Lambda compatible function
var terraform = require('./index.js');

//Call async handler and log return
terraform.handler({
	local: true,
  action: process.argv[2],
}).then(function(payload) {
	console.log(payload);
});
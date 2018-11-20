//This is a wrapper for the Lambda compatible function
var terraform = require('./index.js');

//Call async handler and log return
terraform.handler({
	local: true
}).then(function(payload) {
	console.log(payload);
});
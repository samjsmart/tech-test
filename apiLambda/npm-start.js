//This is a wrapper for the Lambda compatible function
var api = require('./index.js');

//Call async handler and log return
api.handler({
    Path: process.argv[2]
  },
  null,
  function(payload) {
    console.log(payload);
});
var loginHandler = require('./login')

exports.handler = function (event, context, callback) {
  
  //Declare and init response
  var response = {};

  //Login is special so we skip auth
  if(event.path == '/login')
    response = loginHandler(event);

  //Content will always be json and CORS needs to be enabled
  //TODO: Pass domain in as env var and allow access based on it
  response.headers = {
    'Content-Type':                 'application/json; charset=utf-8',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'OPTIONS,HEAD,GET,POST,PUT,PATCH,DELETE',
    'Access-Control-Allow-Origin':  '*'
  }

  //Send the response
  callback(null, response);
}

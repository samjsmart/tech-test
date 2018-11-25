var validator = require('validator');

function handleLogin(event) {

  //CORS options request
  if(event.httpMethod == "OPTIONS") {
    console.log('/login OPTIONS request');
    return {
      statusCode: 200,
      body: ''
    }
  }

  //Parse posted params
  var params = JSON.parse(event.body);

  //Log params
  console.log(params);

  //Check email and password are present
  if(!params.email || !params.password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        Error: 'Missing field'
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(params)
  }
}

module.exports = handleLogin;
var validator = require('validator');
var jwt       = require('jsonwebtoken');

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

  //Implement user search here
  //TODO


  //All okay, create the token
  //TODO: Replace static values after testing
  var token = jwt.sign(
    {
      userid: 42 //Life, the universe and everything.
    },
    process.env['SECRET_KEY'],
    {
      algorithm: 'HS256',
      expiresIn: '1d'
    }
  )

  //Return the token
  return {
    statusCode: 200,
    body: JSON.stringify({
      token: token
    })
  }
}

module.exports = handleLogin;
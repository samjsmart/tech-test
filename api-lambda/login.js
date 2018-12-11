var validator = require('validator');
var jwt       = require('jsonwebtoken');
var aws       = require('aws-sdk');
var dynamodb  = new aws.DynamoDB();

async function handleLogin(event) {

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

  //Check email and password are present
  if(!params.email || !params.password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        Error: 'Missing field'
      })
    }
  }

  try {
    //Construct DynamoDB search params
    var dbParams = {
      ExpressionAttributeValues: {
        ":v1": {
          S: params.email
        }
      },
      KeyConditionExpression: "Email = :v1",
      TableName: process.env['USER_TABLE']
    }

    var result = await dynamodb.query(dbawdParams).promise();
    console.log(dbParams);
    console.log(result);

  } catch(e) {

    //Log the exception for investigation
    console.log(e);

    //Notify client of a generic error
    return {
      statusCode: 500,
      body: JSON.stringify({
        Error: 'An error has occurred'
      })
    }
  }

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
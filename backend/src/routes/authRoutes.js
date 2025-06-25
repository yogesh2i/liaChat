const express = require('express');
const { login, register } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
/*
endpoint: http://produrl/api/auth/login
method: post
body: {username: required}
1. OK
response: {
  success: true,
  message: "User loggedIn successfully"
  data: {
    username: user name,
    userId: user id
  }
}

2. FAIL
response: {
  success: false,
  message: "Failed to login"
  data: null
}
*/

router.post('/register', register);
/*
endpoint: http://produrl/api/auth/register
method: post
body: {username: required}
1. OK
response: {
  success: true,
  message: "User registered successfully"
  data: {
    username: user name,
    userId: user id
  }
}

2.
response: {
  success: false,
  message: "Failed to register"
  data: null
}
*/

module.exports = router;
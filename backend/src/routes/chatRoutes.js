const express = require('express');
const { save, history, summarize } = require('../controllers/chatController');

const router = express.Router();

router.post('/save',save);
/*
endpoint: http://prod_url/api/chat/save
method: post,
body: {user,type,text,timestamp}
1. OK
response: {
 success: true,
 message: saved successfully
 data: chat
}

2. FAIL
response: {
 success: false,
 message: failed to save
 data: chat
}
*/

router.get('/history',history);
/*
endpoint: http://prod_url/api/chat/history
method: get,
1. OK
response: {
 success: true,
 message: fetched successfully
 data: chat
}

2. FAIL
response: {
 success: false,
 error: failed to fetch
 data: chat
}
*/

router.post('/summarize',summarize);
/*
endpoint: http://prod_url/api/chat/summarize
method: post,
body: {history: array of chats}
1. OK
response: {
 success: true,
 message: fetched successfully
 data: chat
}

2. FAIL
response: {
 success: false,
 error: failed to fetch
 data: null
}
*/
module.exports = router;
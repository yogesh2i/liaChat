const generateData = require("../utilities/generateData")

//when user send a message 
//1. Save chat to db
//2. broadcast msg to all users along with client itself
async function messageHandler(socket, io, req) {
    const data = generateData('message', req.text, req.username);

    const response = await fetch(`${process.env.PROD_URL}/api/chat/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        socket.emit('error', { error: 'Failed to send message' });
        return;
    }
    io.emit('message', data);
}

module.exports = messageHandler;
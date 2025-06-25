const generateData = require("../utilities/generateData")

//emit typing event when user starts typing
function startTypingHandler(socket, req) {
    const data = generateData('typing', `${req.username} is typing...`, req.username);
    socket.broadcast.emit('typing', data);
}

//emit stopTyping event when user has sent the message
function stopTypingHandler(socket, req) {
    const data = generateData('typing', `${req.username} stopped typing.`, req.username);
    socket.broadcast.emit('stopTyping', data);
}

module.exports = { startTypingHandler, stopTypingHandler };
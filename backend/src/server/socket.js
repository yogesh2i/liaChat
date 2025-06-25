const disconnectHandler = require('../handlers/connectionHandler');
const joinHandler = require('../handlers/joinHandler');
const messageHandler = require('../handlers/messageHandler');
const { startTypingHandler, stopTypingHandler } = require('../handlers/typingHandler');

let onlineUsers = {};

function setupSocket(io) {
  io.on('connection', (socket) => {

    // Handle user login
    socket.on('join', (req) => joinHandler(socket, req, onlineUsers));

    // Handle message sending
    socket.on('message', (req) => messageHandler(socket, io, req));

    // Handle typing indicator
    socket.on('typing', (req) => startTypingHandler(socket, req));
    socket.on('stopTyping', (req) => stopTypingHandler(socket, req))

    // Handle user disconnect
    socket.on('disconnect', () => disconnectHandler(socket, onlineUsers));

  });
}

module.exports = { setupSocket };
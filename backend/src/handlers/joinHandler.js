const generateData = require("../utilities/generateData");

//when user joins a chat
//1. Send broadcast "user has joined the chat"
//2. Emit welcome event to joined user "You  have joined the chat"
function joinHandler(socket, req, onlineUsers) {
  if (!onlineUsers[socket.id]) {
    onlineUsers[socket.id] = req.username;

    const data = generateData('notify', `${req.username} has joined the chat`, req.username);
    socket.broadcast.emit('userJoined', data);

    data.text = `You have joined the chat as ${req.username}`
    socket.emit('welcome', data);
  }
}

module.exports = joinHandler;
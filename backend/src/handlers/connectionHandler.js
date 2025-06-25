const generateData = require("../utilities/generateData");

//when user left send broadcast message to everyone "user has left the chat"
function disconnectHandler(socket, onlineUsers) {
    if (onlineUsers[socket.id]) {
        const data = generateData('notify', `${onlineUsers[socket.id]} has left the chat`, onlineUsers[socket.id])
        socket.broadcast.emit('userLeft', data);
    }
    delete onlineUsers[socket.id];
}

module.exports = disconnectHandler;
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/server/app'); 
const { setupSocket } = require('./src/server/socket'); 
const connectToDatabase = require('./src/server/db');
require('dotenv').config();
const PORT = process.env.PORT;

async function main(){
    
await connectToDatabase();
//app server
const server = http.createServer(app);

//socket server
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

main();
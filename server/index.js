//Setup
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);

//Tell express to server the client/ 
app.use(express.static('../client'))

// All players will be stored in here
let players = [];

// Executes every time a user connects
io.on('connection', (socket) => {
  console.log('a user connected');
  // Create a new player object
  const player = {
    id: socket.id,
    pos: {
      x: 300,
      y: 300,
      angle: 0,
    },
    input: []
  }

  players.push(player);

  socket.on('input-update', (inputArray) => {
    players.forEach(player => {
      if (player.id == socket.id) {
        player.input = inputArray;
      }
    })
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(80, () => {
  console.log('listening on *:80');
});

// Main processing loop
setInterval(() => {

  players.forEach(player => {
    if (player.input.length) {
      // Process inputs
      player.input.forEach((input)=>{
        if (input == "forward") {
          player.pos.y--;
        }
        if (input == "backward") {
          player.pos.y++;
        }
      })
      // Send new positions
      io.to(player.id).emit('position-update', player.pos);
    }
  })
});
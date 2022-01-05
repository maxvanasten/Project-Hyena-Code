//Setup
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);

// Load addons
const Player = require('./addons/player.js');

//Tell express to server the client/ 
app.use(express.static('../client'))

// All players will be stored in here
let players = [];

// Executes every time a user connects
io.on('connection', (socket) => {
  console.log('a user connected');
  // Create a new player object
  const player = new Player(socket.id);

  players.push(player);

  // When the 'input-update' event is RECEIVED FROM the client
  socket.on('input-update', (inputArray) => {
    // Find the player
    players.forEach(player => {
      if (player.id == socket.id) {
        // Set the players input
        player.input = inputArray;
      }
    })
  });

  // When the client is disconnected
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // Remove player from player array
    players.forEach(player => {
      if (player.id == socket.id) {
        players.splice(player);
      }
    })
  });
});

server.listen(80, () => {
  console.log('listening on *:80');
});

// Main processing loop
setInterval(() => {
  players.forEach(player => {
    // Handle movement
    player.handleMovement();
    // Send new position to client
    io.to(player.id).emit('position-update', player.pos);
  })
});
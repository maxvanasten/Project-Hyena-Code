//Setup
require('dotenv').config()
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
  const player = new Player(socket.id, {x: process.env.PLAYER_START_X, y: process.env.PLAYER_START_Y});
  console.log("Create player object")

  players.push(player);
  console.log("Added player to list, new players: "+JSON.stringify(players));

  // When the 'input-update' event is RECEIVED FROM the client
  socket.on('input-update', (data) => {
    // Find the player
    players.forEach(player => {
      console.log(player.id+" : "+socket.id);
      if (player.id == socket.id) {
        // Set the players input
        player.input = data.inputArray;
        player.angle = data.angle;
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

server.listen(process.env.PORT, () => {
  console.log(`Project: Hyena server running on port ${process.env.PORT}`);
});

// Main processing loop
setInterval(() => {
  players.forEach(player => {
    // Handle movement
    player.handleMovement();
    // Send new position to client
    io.to(player.id).emit('position-update', player.pos);

    // Send all other players information
    // Copy player array
    let otherPlayers = players.splice();
    // Remove player themselves from the array
    for (let i = 0; i < otherPlayers.length; i++) {
      if (otherPlayers[i].id == player.id) {
        otherPlayers.splice(i, 1);
      }
    }

    // Send players to client
    io.to(player.id).emit('players', players);
  })


}, process.env.TICKRATE);
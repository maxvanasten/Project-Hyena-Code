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
const PlayerManager = require('./addons/playermanager');
const cameraTools = require('./addons/cameratools.js');

const ObjectManager = require("./addons/objectmanager");
const Chunk = require("./addons/chunk.js");
const GameObject = require("./addons/gameobject");

//Tell express to serve the client/ folder 
app.use(express.static('../client'))

// Initialize managers
const playerManager = new PlayerManager();
const objectManager = new ObjectManager();
// TESTING: Add a custom chunk (before implementing chunkfiles)
const newChunk = new Chunk(0, 0);
const crateObject = new GameObject(500, 500, [
  [0, 0, 200, 0],
  [200, 0, 200, 200],
  [200, 200, 0, 200],
  [0, 200, 0, 0]
], "noTexture");

newChunk.addGameObject(crateObject);
objectManager.addChunk(newChunk);

// Executes every time a user connects
io.on('connection', (socket) => {
  console.log(`User connected, socket ID: ${socket.id}`);
  // Add player to playermanager
  const player = new Player(socket.id, {
    x: process.env.PLAYER_START_X,
    y: process.env.PLAYER_START_Y
  });

  playerManager.players.push(player);

  // When the 'input-update' event is RECEIVED FROM the client
  socket.on('input-update', (data) => {
    // Find the player
    playerManager.players.forEach(player => {
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
    playerManager.players.forEach(player => {
      if (player.id == socket.id) {
        playerManager.players.splice(player);
      }
    })
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Project: Hyena server running on port ${process.env.PORT}`);
});

// Main processing loop
setInterval(() => {
  playerManager.players.forEach(player => {
    // Handle movement
    player.handleMovement();
    // Send new position to client
    io.to(player.id).emit('position-update', {
      pos: player.pos,
      camera: player.camera
    });
    // Send chunk to the client
    io.to(player.id).emit('chunk-info', {
      chunk: objectManager.getChunk(Math.ceil(player.pos.x / parseFloat(process.env.CHUNK_WIDTH)), Math.ceil(player.pos.y / parseFloat(process.env.CHUNK_HEIGHT)))
    })

    // Send players to client
    let playerArray = [];
    playerManager.players.forEach(p => {
      const optimizedPlayer = {
        id: p.id,
        pos: p.pos,
        angle: p.angle
      }
      playerArray.push(optimizedPlayer);
    })
    io.to(player.id).emit('players', playerArray);
  })


}, process.env.TICKRATE);
const express = require('express')
const app = express()
const port = 80
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('../client'))

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
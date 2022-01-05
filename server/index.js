const express = require('express')
const app = express()
const port = 80

const { Server } = require("socket.io");
const io = new Server(app);

app.use(express.static('../client'))

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
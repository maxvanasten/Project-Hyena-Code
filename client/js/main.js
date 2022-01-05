let localPos = {
    x: 300,
    y: 300
}
let newPos = {
    x: localPos.x,
    y: localPos.y
}
let lerpVal = 0;

let camera = {
    x: localPos.x,
    y: localPos.y,
    focussed: false,
    focusPoint: {
        x: 0,
        y: 0
    },
    zoom: 1,
}

const lerp = (value1, value2, amount) => {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

let localAngle = 0;

// Stores other players information necessary for rendering
let localPlayers = [];

const RADIANS_TO_DEGREES = 180 / Math.PI;

// Define empty variables
let CTX, CANVAS;
let inputManager;

//Runs once on page load
const init = () => {
    CANVAS = document.getElementById("gameCanvas");
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
    CTX = CANVAS.getContext('2d');

    inputManager = new InputManager();
}

//Runs when the screen is resized
const resizeCanvas = () => {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
}

const drawPlayer = (x, y, angle) => {
    CTX.rotate(angle); // set angle
    CTX.fillStyle = "#00FF00";
    CTX.fillRect(-50, -50, 100, 100);
}

//Runs at 60 fps
const draw = () => {
    // Clear screen
    CTX.fillStyle = "#545454";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

    CTX.save();
    // Adjust for camera
    CTX.setTransform(1, 0, 0, 1, camera.x, camera.y); // set scale and origin
    // Draw player
    // Loop the lerpVal variable
    lerpVal+=0.01;
    if (lerpVal > 1) {
        lerpVal = 0;
        localPos = newPos;
    }
    // Lerp
    localPos.x = lerp(localPos.x, newPos.x, lerpVal);
    localPos.y = lerp(localPos.y, newPos.y, lerpVal);
    
    drawPlayer(localPos.x, localPos.y, localAngle);

    // Draw other players
    localPlayers.forEach(player => {
        if (player.id != socket.id) {
            drawPlayer(player.pos.x, player.pos.y, player.angle);
        }
    })
    CTX.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations
    CTX.restore();
}

// Add resize event listener
window.addEventListener("resize", resizeCanvas);

// Handle socket.io messages
socket.on('position-update', (data) => {
    newPos = data.pos;
    camera = data.camera;
})

socket.on('players', (players) => {
    localPlayers = players;
})
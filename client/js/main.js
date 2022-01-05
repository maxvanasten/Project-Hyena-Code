let localPos = {
    x: 300,
    y: 300
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
    CTX.setTransform(1, 0, 0, 1, x, y);  // set scale and origin
    CTX.rotate(angle); // set angle
    
    CTX.fillStyle = "#00FF00";
    CTX.fillRect(-50, -50, 100, 100);

    CTX.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations
 }

//Runs at 60 fps
const draw = () => {
    // Clear screen
    CTX.fillStyle = "#545454";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

    // Draw player
    drawPlayer(localPos.x, localPos.y, inputManager.mouse.x, inputManager.mouse.y);

    // Draw other players
    localPlayers.forEach(player=>{
        drawPlayer(player.pos.x, player.pos.y, angle);
    })

    // TESTING ANGLES
    // Get direction vector
    let dirVec = {
        x: inputManager.mouse.x - localPos.x,
        y: inputManager.mouse.y - localPos.y
    }

    // Test directional vector against x-axis
    let angle = Math.atan2(dirVec.y, dirVec.x);
    localPos.angle = angle;
    console.log(angle*RADIANS_TO_DEGREES);
}

// Add resize event listener
window.addEventListener("resize", resizeCanvas);

// Handle socket.io messages
socket.on('position-update', (newPos) => {
    localPos = newPos;
})

socket.on('players', (players)=>{
    localPlayers = players;
})
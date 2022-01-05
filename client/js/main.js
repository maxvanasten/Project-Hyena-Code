let localPos = {
    x: 300,
    y: 300
}

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

//Runs at 60 fps
const draw = () => {
    // Clear screen
    CTX.fillStyle = "#545454";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

    // Draw player
    CTX.fillStyle = "#00FF00";
    CTX.fillRect(localPos.x, localPos.y, 100, 100);
}

// Add resize event listener
window.addEventListener("resize", resizeCanvas);

// Handle socket.io messages
socket.on('position-update', (newPos)=>{
    localPos = newPos;
})



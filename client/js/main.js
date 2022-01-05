let localPos = {
    x: 300,
    y: 300,
    angle: 0
}

const RADIANS_TO_DEGREES = 57.2957795;

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
    CTX.translate(localPos.x-50, localPos.y-50);
    CTX.rotate(localPos.angle)
    CTX.translate(-localPos.x-50, -localPos.y-50);
    CTX.fillRect(localPos.x-50, localPos.y-50, 100, 100);


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
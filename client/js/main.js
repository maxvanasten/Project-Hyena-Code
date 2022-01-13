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

const screenToWorldCoordinates = (camera, x, y) => {
    return {
        x: x + camera.x,
        y: y + camera.y
    }
}

const worldToScreenCoordinates = (camera, x, y) => {
    return {
        x: x - camera.x,
        y: y - camera.y
    }
}

const lerp = (value1, value2, amount) => {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

let localAngle = 0;

// Stores other players information necessary for rendering
let localPlayers = [];

let localChunk;

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
    CTX.save();
    CTX.translate(localPos.x - camera.x, localPos.y - camera.y);
    CTX.rotate(angle); // set angle
    CTX.fillStyle = "#00FF00";
    CTX.fillRect(-50, -50, 100, 100);
    CTX.restore();
    // CTX.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations
}

const drawObject = (obj) => {
    CTX.save();
    CTX.translate(obj.x - camera.x, obj.y - camera.y);
    CTX.strokeStyle = "#FF0000";
    
    // Draw hitbox
    obj.hitboxData.forEach(hitline=>{
        let startX = hitline[0];
        let startY = hitline[1];
        let endX = hitline[2];
        let endY = hitline[3];

        CTX.beginPath();
        CTX.moveTo(startX, startY);
        CTX.lineTo(endX, endY);
        CTX.stroke();
    })

    // TODO: Figure out how texturing is going to work

    CTX.restore();
}

//Runs at 60 fps
const draw = () => {
    // Clear screen
    CTX.fillStyle = "#545454";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

    // Adjust for camera
    // CTX.translate(camera.x, camera.y);
    // Draw player
    // Loop the lerpVal variable
    lerpVal += 0.01;
    if (lerpVal > 1) {
        lerpVal = 0;
        localPos = newPos;
    }
    // Lerp
    localPos.x = lerp(localPos.x, newPos.x, lerpVal);
    localPos.y = lerp(localPos.y, newPos.y, lerpVal);

    // Draw chunk objects
    if (localChunk) {
        for (let i = 0; i < localChunk.objects.length; i++) {
            drawObject(localChunk.objects(i));
        }
    }

    drawPlayer(localPos.x, localPos.y, localAngle);

    // Draw other players
    localPlayers.forEach(player => {
        if (player.id != socket.id) {
            drawPlayer(player.pos.x, player.pos.y, player.angle);
        }
    })


}

// Add resize event listener
window.addEventListener("resize", resizeCanvas);

// Handle socket.io messages
socket.on('position-update', (data) => {
    newPos = data.pos;
    camera = data.camera;

    // Update camera
    camera.x = newPos.x - CANVAS.width / 2;
    camera.y = newPos.y - CANVAS.height / 2;
})

socket.on('players', (players) => {
    localPlayers = players;
})

socket.on('chunk-info', (chunk) => {
    localChunk = chunk.chunk;
    console.log(localChunk);
})
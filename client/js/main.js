let CTX, CANVAS;

//Runs once on page load
const init = () => {
    CANVAS = document.getElementById("gameCanvas");
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
    CTX = CANVAS.getContext('2d');
}

//Runs at 60 fps
const draw = () => {
    CTX.fillStyle = "#545454";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
}




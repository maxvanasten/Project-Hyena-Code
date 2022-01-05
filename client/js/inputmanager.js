// Define controls
const KB_CONTROLS = [
    {
        identifier: "forward",
        code: "KeyW"
    },
    {
        identifier: "backward",
        code: "KeyS"
    },
    {
        identifier: "left",
        code: "KeyA"
    },
    {
        identifier: "right",
        code: "KeyD"
    }
]

class InputManager {
    constructor() {
        // Set up empty variables
        this.keymap = [];
        this.mouse = {
            x: 0,
            y: 0,
            down: false
        }
        this.inputs = [];

        // Add eventlisteners
        window.addEventListener("keydown", (e)=>{
            this.keymap[e.code] = true;
        });
        window.addEventListener("keyup", (e)=>{
            this.keymap[e.code] = false;
        });

        window.addEventListener("mousemove", (e)=>{
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        })

        window.addEventListener("mousedown", (e)=>{
            this.mouse.down = true;
        })
        window.addEventListener("mouseup", (e)=>{
            this.mouse.down = false;
        })
    }

    // Evaluate what controls have been pressed
    handleInput() {
        // Clear previous frames inputs
        this.inputs = [];

        // Check every possible control
        KB_CONTROLS.forEach(control => {
            // If control is pressed
            if (this.keymap[control.code]) {
                // Add input to array
                this.inputs.push(control.identifier);
            }
        })

        // Send the input to the server
        socket.emit('input-update', {
            inputs: this.inputs
        });

        // Debugging
        if (this.inputs.length) {
            console.log(this.inputs);
        }

        
    }
}
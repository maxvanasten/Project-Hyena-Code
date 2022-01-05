class Player {
    constructor(id, pos) {
        this.id = id;
        this.pos = {
            x: parseInt(pos.x),
            y: parseInt(pos.y)
        }
        this.angle = process.env.PLAYER_START_ANGLE;
        this.input = [];
        // setup camera
        this.camera = {
            x: -this.pos.x,
            y: -this.pos.y,
            focussed: false,
            focusPoint: {
                x: 0,
                y: 0
            },
            zoom: 1,
        }

        // Physics stuff for movement
        this.vel = {
            x: 0,
            y: 0
        }
        this.acc = {
            x: 0,
            y: 0
        }
        this.friction = 0.95;
        this.mass = 50;
        this.movementSpeedIncrement = parseFloat(process.env.PLAYER_MOVEMENT_SPEED_INCREMENT);
        this.maxMovementSpeed = parseInt(process.env.MAX_PLAYER_MOVEMENT_SPEED);
    }

    handleMovement() {
        if (this.input.length) {
            // Process inputs
            this.input.forEach((input) => {
                if (input == "forward") {
                    this.applyForce({
                        x: 0,
                        y: -this.movementSpeedIncrement
                    });
                    if (process.env.DEBUG) console.log(`[FORWARD] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
                if (input == "backward") {
                    this.applyForce({
                        x: 0,
                        y: this.movementSpeedIncrement
                    });
                    if (process.env.DEBUG) console.log(`[BACKWARD] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
                if (input == "left") {
                    this.applyForce({
                        x: -this.movementSpeedIncrement,
                        y: 0
                    });
                    if (process.env.DEBUG) console.log(`[LEFT] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
                if (input == "right") {
                    this.applyForce({
                        x: this.movementSpeedIncrement,
                        y: 0
                    });
                    if (process.env.DEBUG) console.log(`[RIGHT] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
            })
        }

        // Apply acceleration & velocity
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        if (this.vel.x > this.maxMovementSpeed) {
            this.vel.x = this.maxMovementSpeed;
        }
        if (this.vel.y > this.maxMovementSpeed) {
            this.vel.y = this.maxMovementSpeed;
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.acc.x = 0;
        this.acc.y = 0;

        this.vel.x *= this.friction;
        this.vel.y *= this.friction;

        // Update camera
        this.camera = {
            x: -this.pos.x,
            y: -this.pos.y,
            focussed: false,
            focusPoint: {
                x: 0,
                y: 0
            },
            zoom: 1,
        }
    }

    applyForce(vector) {
        let f = {
            x: vector.x / this.mass,
            y: vector.y / this.mass
        }
        this.acc.x += f.x;
        this.acc.y += f.y;
    }
}

module.exports = Player;
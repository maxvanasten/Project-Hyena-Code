class Player {
    constructor(id, pos) {
        this.id = id;
        this.pos = {
            x: pos.x,
            y: pos.y,
            angle: pos.angle
        }
        this.input = [];

        this.movementSpeed = process.env.PLAYER_MOVEMENT_SPEED;
    }

    handleMovement() {
        if (this.input.length) {
            // Process inputs
            this.input.forEach((input) => {
                if (input == "forward") {
                    this.pos.y -= this.movementSpeed;
                    console.log(`[FORWARD] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
                if (input == "backward") {
                    this.pos.y += this.movementSpeed;
                    console.log(`[BACKWARD] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
                if (input == "left") {
                    this.pos.x -= this.movementSpeed;
                    console.log(`[LEFT] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
                if (input == "right") {
                    this.pos.x += this.movementSpeed;
                    console.log(`[RIGHT] Moving player ${this.id} to ${this.pos.x}:${this.pos.y}`);
                }
            })
        }
    }
}

module.exports = Player;
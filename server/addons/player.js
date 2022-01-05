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
                }
                if (input == "backward") {
                    this.pos.y += this.movementSpeed;
                }
                if (input == "left") {
                    this.pos.x -= this.movementSpeed;
                }
                if (input == "right") {
                    this.pos.x += this.movementSpeed;
                }
            })
        }
    }
}

module.exports = Player;
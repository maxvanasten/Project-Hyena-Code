class Player {
    constructor(id) {
        this.id = id;
        this.pos = {
            x: 400,
            y: 300,
            angle: 0
        }
        this.input = [];

        this.movementSpeed = 1;
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
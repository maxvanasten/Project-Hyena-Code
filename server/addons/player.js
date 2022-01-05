class Player {
    constructor(id) {
        this.id = id;
        this.pos = {
            x: 400,
            y: 300,
            angle: 0
        }
        this.input = [];
    }

    handleMovement() {
        if (this.input.length) {
            // Process inputs
            this.input.forEach((input) => {
                if (input == "forward") {
                    this.pos.y--;
                }
                if (input == "backward") {
                    this.pos.y++;
                }
                if (input == "left") {
                    this.pos.x--;
                }
                if (input == "right") {
                    this.pos.x++;
                }
            })
        }
    }
}

module.exports = Player;
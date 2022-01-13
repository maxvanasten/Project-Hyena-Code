// The game object will hold all information neccessary for collision and rendering

class GameObject {
    constructor(x, y, hitboxData, textureSrc) {
        // Position relative to the chunk origin
        // TODO: Check if position is within chunk
        this.x = x;
        this.y = y;

        // hitboxData is an array consisting of lines that make up the complete hitbox of the object
        this.hitboxData = hitboxData;

        // texture points directly to the src of the texture for this object
        this.textureSrc = textureSrc;
    }
}

module.exports = GameObject;
// The chunk object will hold all of the objects that are present in that chunk

class Chunk {
    constructor(x, y) {
        this.objects = [];

        // The chunks X and Y position expressed in chunks
        this.x = x;
        this.y = y;
    }

    //Adds an object to this chunk
    addGameObject(gameObject) {
        //TODO: Check validity of game object
        this.objects.push(gameObject);
    }
}

module.exports = Chunk;
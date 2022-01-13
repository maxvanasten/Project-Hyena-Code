// The chunk object will hold all of the objects that are present in that chunk

class Chunk {
    constructor() {
        this.objects = [];

        // The chunks X and Y position expressed in chunks
        this.x = 0;
        this.y = 0;
    }

    //Adds an object to this chunk
    addGameObject(gameObject) {
        //TODO: Check validity of game object
        this.objects.push(gameObject);
    }
}

module.exports = Chunk;
// The object manager will store all non player objects like crates, walls etc.

// The object manager will store all objects in chunks, objects will never move
// The object manager will then send the object information for the chunk the player is in
// This information consists of location, size, orientation and texture for the object.
// The object manager will work together with the shooting manager(?) to make sure no bullet was stopped in an object.
// Each object has a hitbox which consists out of lines.

// TODO 
// If a chunkfile is found, import those chunks and the objects they include.
// This will open up the possibility for a map editor.
// Someone could easily create a chunk and add that to the pool, then on world generation
// Every chunk will be randomly selected from the chunks that are in the chunkfile

const Chunk = require('./chunk.js');

class ObjectManager {
    constructor() {
        this.chunks = [];
    }

    //Takes chunk coordinates and returns the corresponding chunk
    getChunk(chunkX, chunkY) {
        let c;
        this.chunks.forEach(chunk=>{
            if (chunk.x == chunkX && chunk.y == chunkY) {
                c = chunk;
            }
        })

        return c;
    }

    addChunk(chunk) {
        //TODO: Check if chunk does not already exist (coordinates)
        this.chunks.push();
    }
}

module.exports = ObjectManager;
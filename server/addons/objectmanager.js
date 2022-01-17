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
const GameObject = require("./gameobject.js");

// Add chunks manually
const test_chunk = require("../chunkfiles/test_chunk.json");

class ObjectManager {
    constructor() {
        this.chunks = [];
        this.presetChunks = [];

        // Add chunks manually pt. 2
        this.presetChunks.push(test_chunk);

        // World details
        this.worldWidthInChunks = 10;
        this.worldHeightInChunks = 10;
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
        this.chunks.push(chunk);
    }

    generateWorld() {
        // Loop through all chunk slots
        for (let x = 0; x < this.worldWidthInChunks; x++) {
            for (let y = 0; y < this.worldHeightInChunks; y++) {
                // Generate chunk
                // TODO: Pick random chunk types
                let chunkPreset = this.presetChunks[Math.floor(Math.random()*this.presetChunks.length)];
                // Insert chunk
                const chunk = new Chunk(x, y);
                // Process objects
                chunkPreset.objects.forEach(obj=>{
                    const gameObject = new GameObject(obj.position.x, obj.position.y, obj.hitboxData, obj.textureSrc);
                    chunk.addGameObject(gameObject);
                })

                this.addChunk(chunk);
            }
        }
    }
}

module.exports = ObjectManager;
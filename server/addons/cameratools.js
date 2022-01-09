module.exports = {
    screenToWorldCoordinates: function (camera, x, y) {
        return {
            x: x + camera.x,
            y: y + camera.y
        }
    },

    worldToScreenCoordinates: function (camera, x, y) {
        return {
            x: x - camera.x,
            y: y - camera.y
        }
    }
};
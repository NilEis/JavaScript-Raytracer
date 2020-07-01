/**
 * 
 * @param {World} world Die Welt
 * @param {vector2D} point 
 * @param {number} distanceToPlane Die Entfernung zum Rechteck
 * @param {number} sx Der Startpunkt des Rechtecks
 * @param {number} sy Der Startpunkt des Rechtecks
 * @param {number} ex Der Endpunkt des Rechtecks
 * @param {number} ey Der Endpunkt des Rechtecks
 * @return {color[]} Die Farbwerte für jeden Pixel
 */
function render(world, point, distanceToPlane, sx, sy, ex, ey, w, h) {
    let retArr = [];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            retArr.push(random.getRandomColor());
        }
    }
    return retArr;
}

self.addEventListener('message', function (e) {
    self.postMessage(render(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4], e.data[5], e.data[6], e.data[7], e.data[8]));
}, false);
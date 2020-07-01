/**
 * 
 * @param {World} world Die Welt
 * @param {vector3D} point 
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
            const vx = x * ((ex - sx) / w);
            const vy = y * ((ey - sy) / h);
            const ray = new vector3D.sub(new vector3D(vx, vy, distanceToPlane), point);
            retArr.push(random.getRandomColor());
        }
    }
    return retArr;
}
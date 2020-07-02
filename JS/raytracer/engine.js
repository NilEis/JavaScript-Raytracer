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
function render(world, point, distanceToPlane, sx, sy, ex, ey, width, height) {
    let retArr = [];
    for (let y = sy; y < ey; y++) {
        for (let x = sx; x < ex; x++) {
            const vx = mapValue(x, 0, width, -1, 1);
            const vy = mapValue(y, 0, height, 1, -1);
            const ray = new vector3D(vx,vy,1);
            const clr = normalToRGB(ray);
            retArr.push(clr);
        }
    }
    return retArr;
}

function normalToRGB(pV) {
    pV.normalize();
    const r = mapValue(pV.x, -1, 1, 0, 255);
    const g = mapValue(pV.y, -1, 1, 0, 255);
    const b = mapValue(pV.z, -1, 1, 0, 255);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
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
async function render(world, point, distanceToPlane, sx, sy, ex, ey, width, height, aspectX, aspectY, bounces) {
    let retArr = [];
    const i = 1;
    for (let y = sy; y < ey; y++) {
        for (let x = sx; x < ex; x++) {
            if (y % i == 0 && x % i == 0) {
                const vx = mapValue(x, 0, width, -aspectX, aspectX);
                const vy = mapValue(y, 0, height, aspectY, -aspectY);
                const ray = new vector3D(vx, vy, distanceToPlane);
                ray.normalize();
                const clr = colorToRGB(traceRay(world, point, ray, 1, Infinity, bounces));
                //c.line(x,y,x+vx,y+vy,"white");
                retArr.push(clr);
            } else
                retArr.push(colorToRGB([0, 0, 0]));

        }
    }
    return retArr;
}


function traceRay(world, origin, direction, clipMin, clipMax, rekAnker) {
    const retV = closestIntersection(world, origin, direction, clipMax, clipMin);
    if (!retV)
        return world.BACKGROUND_COLOR;
    let closest_sphere = retV[0];
    let closest_t = retV[1];
    let p = vector3D.add(origin, vector3D.mul(direction, closest_t));
    let normale = vector3D.sub(p, closest_sphere.pos);
    normale.normalize();
    const r = closest_sphere.reflective;
    const t = closest_sphere.transparency;
    const local_color = mulRGB(mulRGB(closest_sphere.color, ComputeLighting(world, p.get(), normale.get(), vector3D.mul(direction, -1), closest_sphere.specular)), 1+closest_sphere.emission);
    if (rekAnker <= 0 || (r <= 0 && t <= 0))
        return local_color;
    const rRay = reflectRay(vector3D.mul(direction, -1), normale);
    const reflected_color = r <= 0 ? [0, 0, 0] : traceRay(world, p, rRay, 0.001, Infinity, rekAnker - 1);
    const tRay = reflectRay(vector3D.mul(direction, -1), normale);
    const transparent_color = t <= 0 ? [0, 0, 0] : traceRay(world, p, tRay, 0.001, Infinity, rekAnker - 1);
    const blended_color = addRGB(mulRGB(local_color, (1 - r)), mulRGB(reflected_color, r));
    return addRGB(mulRGB(blended_color, (1 - t)), mulRGB(transparent_color, t));
}

function closestIntersection(world, origin, direction, clipMax, clipMin) {
    let closest_t = Infinity;
    let closest_sphere = null;
    for (let i = 0; i < world.spheres.length; i++) {
        let t12 = IntersectRaySphere(origin, direction, world.spheres[i]);
        const t1 = t12[0];
        const t2 = t12[1];
        if (t1 < clipMax && t1 > clipMin && t1 < closest_t) {
            closest_t = t1;
            closest_sphere = world.spheres[i];
        }
        if (t2 < clipMax && t2 > clipMin && t2 < closest_t) {
            closest_t = t2;
            closest_sphere = world.spheres[i];
        }
    }
    if (closest_sphere)
        return [closest_sphere, closest_t];
    else
        return false;
}

function reflectRay(ray, normal) {
    return vector3D.sub(vector3D.mul(normal, 2 * vector3D.scalarProduct(normal, ray)), ray);
}
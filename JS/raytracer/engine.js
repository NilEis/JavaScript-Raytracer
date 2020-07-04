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
            if (y % y == 0 && x % i == 0) {
                const vx = mapValue(x, 0, width, -aspectX, aspectX);
                const vy = mapValue(y, 0, height, aspectY, -aspectY);
                const ray = new vector3D(vx, vy, distanceToPlane);
                ray.normalize();
                const clr = colorToRGB(traceRay(world, point, ray, 1, Infinity, bounces));
                //c.line(x,y,x+vx,y+vy,"white");
                for (let j = 0; j < i; j++)
                    retArr.push(clr);
            } //else
                //retArr.push(colorToRGB([0, 0, 0]));

        }
    }
    return retArr;
}


function traceRay(world, origin, direction, clipMin, clipMax, rekAnker) {
    const retV = closestIntersection(world, origin, direction, clipMax, clipMin);
    if (!retV)
        return world.BACKGROUND_COLOR;
    let closest_obj = retV[0];
    let closest_t = retV[1];
    let p = vector3D.add(origin, vector3D.mul(direction, closest_t));
    let normale = closest_obj.getNormale(p);
    normale.normalize();
    const r = closest_obj.reflective;
    const t = closest_obj.transparency;
    const local_color = mulRGB(mulRGB(closest_obj.color, ComputeLighting(world, p.get(), normale.get(), vector3D.mul(direction, -1), closest_obj.specular)), 1 + closest_obj.emission);
    if (rekAnker <= 0 || (r <= 0 && t <= 0))
        return local_color;
    const rRay = reflectRay(vector3D.mul(direction, -1), normale);
    const reflected_color = r <= 0 ? [0, 0, 0] : traceRay(world, p, rRay, 0.001, Infinity, rekAnker - 1);
    const blended_color = addRGB(mulRGB(local_color, (1 - r)), mulRGB(reflected_color, r));
    const tRay = refractRay(vector3D.mul(direction, -1), normale, 1, closest_obj.IOR);
    if (tRay)
        return blended_color;
    const transparent_color = t <= 0 ? [0, 0, 0] : traceRay(world, p, tRay, 0.001, Infinity, rekAnker - 1);
    return addRGB(mulRGB(blended_color, (1 - t)), mulRGB(transparent_color, t));
}

function closestIntersection(world, origin, direction, clipMax, clipMin) {
    let closest_t = Infinity;
    let closest_object = null;
    for (let i = 0; i < world.spheres.length; i++) {
        let t12 = IntersectRaySphere(origin, direction, world.spheres[i]);
        const t1 = t12[0];
        const t2 = t12[1];
        if (t1 < clipMax && t1 > clipMin && t1 < closest_t) {
            closest_t = t1;
            closest_object = world.spheres[i];
        }
        if (t2 < clipMax && t2 > clipMin && t2 < closest_t) {
            closest_t = t2;
            closest_object = world.spheres[i];
        }
        //closest_t = Math.max(t1,t2);
    }
    for (let i = 0; i < world.planes.length; i++) {
        const t1 = IntersectRayPlane(origin, direction, world.planes[i]);
        if (t1 < clipMax && t1 > clipMin && t1 < closest_t) {
            closest_t = t1;
            closest_object = world.planes[i];
        }
    }
    for (let i = 0; i < world.disks.length; i++) {
        const t1 = IntersectRayDisk(origin, direction, world.disks[i]);
        if (t1 < clipMax && t1 > clipMin && t1 < closest_t) {
            closest_t = t1;
            closest_object = world.disks[i];
        }
    }
    if (closest_object)
        return [closest_object, closest_t];
    else
        return false;
}

function reflectRay(ray, normal) {
    return vector3D.sub(vector3D.mul(normal, 2 * vector3D.scalarProduct(normal, ray)), ray);
}

function refractRay(ray, normal, n1, n2) {
    const einfallsvektor = ray.get();
    einfallsvektor.normalize();
    const n = n1 / n2;
    const cosI = -vector3D.scalarProduct(normal, ray);
    const sinT2 = n * n * (1.0 - cosI * cosI);
    if (sinT2 > 1.0) return false;
    const cosT = Math.sqrt(1.0 - sinT2);
    return vector3D.add(vector3D.mul(einfallsvektor, n), vector3D.mul(normal, (n * cosI - cosT)));
}
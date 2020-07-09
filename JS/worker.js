importScripts("functions/math.js");
importScripts("functions/random.js");
importScripts("functions/vector.js");
importScripts("raytracer/color.js");
importScripts("raytracer/Objekt.js");
importScripts("raytracer/disk.js");
importScripts("raytracer/engine.js");
importScripts("raytracer/light.js");
importScripts("raytracer/plane.js");
importScripts("raytracer/sphere.js");
importScripts("raytracer/triangle.js");

onmessage = async (evt) => {
    const param = evt.data;
    for (let i = 0; i < param[0].disks.length; i++) {
        param[0].disks[i] = disk.from(param[0].disks[i]);
    }
    for (let i = 0; i < param[0].planes.length; i++) {
        param[0].planes[i] = plane.from(param[0].planes[i]);
    }
    for (let i = 0; i < param[0].spheres.length; i++) {
        param[0].spheres[i] = sphere.from(param[0].spheres[i]);
    }
    for (let i = 0; i < param[0].triangles.length; i++) {
        param[0].triangles[i] = triangle.from(param[0].triangles[i]);
    }
    for (let i = 0; i < param[0].lights.length; i++) {
        param[0].lights[i] = light.from(param[0].lights[i]);
    }
    const point = new vector3D(param[1].x, param[1].y, param[1].z);
    const result = await render(param[0], point, param[2], param[3], param[4], param[5], param[6], param[7], param[8], param[9], param[10], param[11], param[12]);
    self.postMessage([result, param[13].x, param[13].y, param[13].tw, param[13].th]);
    self.close();
};
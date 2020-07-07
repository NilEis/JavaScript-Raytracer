/**
 * @file Beispiel für die Nutzung der "Engine".
 * @module Beispiel
 */


const WIDTH = 500;
const HEIGHT = 500;

/**
 * @constant {canvasClass} c Die canvasClass
 */
const c = new canvasClass("canvasID", "canvas", WIDTH, HEIGHT, "black");

const POINT = new vector3D(0, 0, -4);

const PLANE = new vector3D(1.5, 0, -4);

const FPS = 0;

var scene;

//const webW = new Worker("JS/engine.js");

//Leere die Konsole um einen besseren Überblick in dieser zu bekommen
//console.clear();

/**
 * @var {number} tickIntervall Die Variabel in der der Intervall gespeichert wird
 */
var tickIntervall;

/**
 * Setzt alles in den Startzustand
 */
function init() {
    c.cls();
    scene = {
        spheres: [],
        planes: [],
        disks: [],
        triangles: [],
        lights: [],
        BACKGROUND_COLOR: [200, 200, 200]
    };

    //Add Spheres
    scene.spheres.push(new sphere(0.5, 0, 2, 1, [255, 0, 0], 500, 0.5, 0.8, 1.3));
    /*scene.spheres.push(new sphere(-1, 0, -2, 1, [0, 255, 0], 500, 0.2));
    scene.spheres.push(new sphere(2, 0, 4, 1, [0, 0, 255], 500, 0.2));
    scene.spheres.push(new sphere(-2, 0, 4, 1, [0, 255, 0], 500, 0.4));*/
    //scene.spheres.push(new sphere(0, -5001, 0, 5000, [255, 255, 0], 10, 0.5));

    //Add Planes
    scene.planes.push(new plane(0, -1, 0, 0, 1, 0, [255, 255, 0], 100, 0.5));
    scene.planes.push(new plane(0, 50, 0, 0, 1, 0, [0, 0, 250], 100, 0.1));

    //Add Disks
    /*scene.disks.push(new disk(0, -0.5, 1, 0.1, 1.2, 0, 1, [100, 255, 0], 500, 0.08));*/

    //Add Triangles
    //scene.triangles.push(new triangle(-1, 0, 2, 0, 2, 1, 1, 0, 2, [0, 255, 255], 100, 0.6));

    //Add lights
    scene.lights.push(new light(AMBIENT, 0.2));
    scene.lights.push(new light(POINTLIGHT, 0.4, new vector3D(2, 3, 0)));
    scene.lights.push(new light("directional", 0.4, null, new vector3D(1, 4, 4)));

    if (FPS == 0)
        tick(1);
    else
        tickIntervall = setInterval(tick, 1000 / FPS, 1);

}


/**
 * Aktualisiert und zeichnet alles
 */
function tick(bounces) {
    c.cls();
    start(1, 50, bounces);
}


function start(tileX, tileY, bounces) {
    if (WIDTH % tileX != 0 || HEIGHT % tileY != 0)
        alert("!!!WIDTH%tileX != 0 || HEIGHT % tileY != 0!!!");
    const tw = WIDTH / tileX;
    const th = HEIGHT / tileY;
    const dToP = vector3D.sub(PLANE, POINT).mag;
    const pixelate = document.getElementById("pixelate") == null ? 1 : document.getElementById("pixelate").value;
    for (let y = 0; y < tileY; y++)
        for (let x = 0; x < tileX; x++)
            setTimeout(processTile, 0, dToP, x, tw, y, th, bounces, pixelate);
}

/*webW.addEventListener('message', function(e) {
    c.render(e.data, WIDTH, 0, 0, WIDTH, HEIGHT,1,1);
  }, false);
*/
init();

function processTile(dToP, x, tw, y, th, bounces, pixelate = 1) {
    render(scene, POINT, dToP, x * tw, y * th, x * tw + tw, y * th + th, WIDTH, HEIGHT, WIDTH / HEIGHT, 1, bounces, pixelate).then((result) => {
        c.render(result, x * tw, y * th, x * tw + tw, y * th + th, 1, 1);
        console.log((WIDTH * HEIGHT) + ":" + result.length);
    }).catch((err) => {
        alert(err);
    });
}
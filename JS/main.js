/**
 * @file Beispiel für die Nutzung der "Engine".
 * @module Beispiel
 */


const WIDTH = 600;
const HEIGHT = 400;

/**
 * @constant {canvasClass} c Die canvasClass
 */
const c = new canvasClass("canvasID", "canvas", WIDTH, HEIGHT, "black");

const POINT = new vector3D(0, -0.25, 0);

const PLANE = new vector3D(2.5, -0.25, 0);

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
        lights: [],
        BACKGROUND_COLOR: [200, 200, 200]
    };
    //Add Spheres
    scene.spheres.push(new sphere(0.5, 0, 2, 1, [255, 0, 0], 500, 0.2,0.8,1.3));
    scene.spheres.push(new sphere(0, 0, -2, 1, [0, 255, 0], 500, 0.2));
    scene.spheres.push(new sphere(2, 0, 4, 1, [0, 0, 255], 500, 0.2));
    scene.spheres.push(new sphere(-2, 0, 4, 1, [0, 255, 0], 500, 0.4));
    scene.spheres.push(new sphere(0, -5001, 0, 5000, [255, 255, 0], 10, 0.5));
    //Add lights
    scene.lights.push(new light(AMBIENT, 0.2));
    scene.lights.push(new light(POINTLIGHT, 0.6, new vector3D(2, 3, 0)));
    scene.lights.push(new light("directional", 0.2, null, new vector3D(1, 4, 4)));
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
    start(2,2,bounces);
}


function start(tileX, tileY, bounces) {
    const tw = WIDTH / tileX;
    const th = HEIGHT / tileY;
    const dToP = vector3D.sub(PLANE, POINT).mag;
    for (let y = 0; y < tileY; y++)
    for (let x = 0; x < tileX; x++)
        setTimeout(processTile,0,dToP, x, tw, y, th, bounces);
}

/*webW.addEventListener('message', function(e) {
    c.render(e.data, WIDTH, 0, 0, WIDTH, HEIGHT,1,1);
  }, false);
*/
init();

function processTile(dToP, x, tw, y, th, bounces) {
    render(scene, POINT, dToP, x * tw, y * th, x * tw + tw, y * th + th, WIDTH, HEIGHT, WIDTH / HEIGHT, 1, bounces).then((result) => {
        c.render(result, x * tw, y * th, x * tw + tw, y * th + th, 1, 1);
        console.log((WIDTH * HEIGHT) + ":" + result.length);
    }).catch((err) => {
        alert(err);
    });
}

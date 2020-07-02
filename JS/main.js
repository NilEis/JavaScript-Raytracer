/**
 * @file Beispiel für die Nutzung der "Engine".
 * @module Beispiel
 */


const WIDTH = 1024;
const HEIGHT = 512;

/**
 * @constant {canvasClass} c Die canvasClass
 */
const c = new canvasClass("canvasID", "canvas", WIDTH, HEIGHT, "black");

const POINT = new vector3D(0, 0, 0);

const PLANE = new vector3D(4, 0, 0);

const FPS = 0;

var scene = {
    spheres: [],
    BACKGROUND_COLOR = [200, 200, 200]
};

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
    if (FPS == 0)
        tick();
    else
        tickIntervall = setInterval(tick, 1000 / FPS);

}


/**
 * Aktualisiert und zeichnet alles
 */
function tick() {
    c.cls();
    const sx = 0,
        sy = 0,
        ex = WIDTH,
        ey = HEIGHT + sy;
    const dToP = vector3D.sub(POINT, PLANE).mag;
    //webW.postMessage(["Welt einfügen", POINT, dToP, 0, 0, 1, 1, WIDTH, HEIGHT]);
    const img = render(scene, POINT, dToP, sx, sy, ex, ey, WIDTH, HEIGHT);
    console.log((WIDTH * HEIGHT) + ":" + img.length);
    c.render(img, ex - sx, sx, sy, ex, ey, 1, 1);
}

/*webW.addEventListener('message', function(e) {
    c.render(e.data, WIDTH, 0, 0, WIDTH, HEIGHT,1,1);
  }, false);
*/
init();
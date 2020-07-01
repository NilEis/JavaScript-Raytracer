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

const POINT = new vector2D(5, 0);

const PLANE = new vector2D(4, 0);

const FPS = 60;

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
    tickIntervall = setInterval(tick, 1000 / FPS);
    
}


/**
 * Aktualisiert und zeichnet alles
 */
function tick() {
    c.cls();
    const dToP = vector2D.sub(POINT, PLANE).mag;
    //webW.postMessage(["Welt einfügen", POINT, dToP, -1, -1, 1, 1, WIDTH, HEIGHT]);
    const img = render("Welt einfügen", POINT, dToP, -1, -1, 1, 1, WIDTH, HEIGHT);
    c.render(img, WIDTH, 0, 0, WIDTH, HEIGHT,1,1);
}

/*webW.addEventListener('message', function(e) {
    c.render(e.data, WIDTH, 0, 0, WIDTH, HEIGHT,1,1);
  }, false);
*/
init();
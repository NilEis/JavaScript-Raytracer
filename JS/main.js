/**
 * @file Beispiel für die Nutzung der "Engine".
 * @module Beispiel
 */

/**
 * @constant {canvasClass} c Die canvasClass
 */
const c = new canvasClass("canvasID", "canvas", WIDTH * TILESIZE, HEIGHT * TILESIZE, "black");

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
}


init();
/**
 * @file Stellt Funktionen zum Zugriff auf die Maus zur verfügung
 * @module mouse.js
 */

/**
 * @var mouseX Die x-Position der Maus 
 * @type {number}
 */
var mouseX = 0;

/**
 * @var mouseY Die y-Position der Maus
 * @type {number}
 */
var mouseY = 0;


var pMX;
var pMY;
/**
 * @var mouseDown Die Variabel speichert, ob eine der Maustasten gedrückt ist
 * @type {boolean}
 * @example
 * if(mouseDown)
 *      console.log("Eine Maustaste wurde gedrückt");
 * else
 *      console.log("Es wurde keine Taste gedrückt");
 * //Kürzer:
 * console.log(mouseDown ? "Eine Maustaste wurde gedrückt" : "Es wurde keine Taste gedrückt")
 */
var mouseDown = 0;
document.body.onmousedown = function () {
    pMX = mouseX;
    pMY = mouseY;
    _emitter.pos.x = mouseX;
    _emitter.pos.y = mouseY;
    mouseDown = 1;
}
document.body.onmouseup = function () {
    if (mouseX > 0 && mouseX < c.width && mouseY > 0 && mouseY < c.height) {
        px = mouseX;
        py = mouseY;
    }
    mouseDown = 0;
}
//Die Funktion wird ausgeführt wenn die Maus bewegt wird.
function updateMouse(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}
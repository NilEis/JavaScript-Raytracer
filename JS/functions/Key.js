/**
 * @var key Die Variabel, in welcher die letzte Richtungstaste gespeichert ist.
 * @type {string}
 */
var key;


document.onkeydown = function (event) {
    if (event.keyCode === 37 || event.keyCode === 65) { // pacChar MOVE LEFT
        key = "left";
    } else if (event.keyCode === 38 || event.keyCode === 87) { // pacChar MOVE UP
        key = "up";
    } else if (event.keyCode === 39 || event.keyCode === 68) { // pacChar MOVE RIGHT
        key = "right";
    } else if (event.keyCode === 40 || event.keyCode === 83) { // pacChar MOVE DOWN
        key = "down";
    }
    if (event.keyCode === 82)
        init();
}

document.onkeyup = function(event){
    key = "";
}


/**
 * Die Methode erkennt Swipe-Bewegungen. Quelle: {@link https://stackoverflow.com/a/58719294}
 * @param {string} id Die Id des Elements das für touch-events genutzt werden soll.
 * @param {Function} func Die callback-Funktion
 * @param {number} deltaMin Die minimale distanz bis die Funktion auslöst
 */
//detectSwipe('swipeme', (el, dir) => alert(`you swiped on element with id ${el.id} to ${dir} direction`));

// source code

// Tune deltaMin according to your needs. Near 0 it will almost
// always trigger, with a big value it can never trigger.
function detectSwipe(id, func, deltaMin = 90) {
    const swipe_det = {
        sX: 0,
        sY: 0,
        eX: 0,
        eY: 0
    }
    // Directions enumeration
    const directions = Object.freeze({
        UP: 'up',
        DOWN: 'down',
        RIGHT: 'right',
        LEFT: 'left'
    })
    let direction = null
    const el = document.getElementById(id)
    el.addEventListener('touchstart', function (e) {
        const t = e.touches[0]
        swipe_det.sX = t.screenX
        swipe_det.sY = t.screenY
    }, false)
    el.addEventListener('touchmove', function (e) {
        // Prevent default will stop user from scrolling, use with care
        // e.preventDefault();
        const t = e.touches[0]
        swipe_det.eX = t.screenX
        swipe_det.eY = t.screenY
    }, false)
    el.addEventListener('touchend', function (e) {
        const deltaX = swipe_det.eX - swipe_det.sX
        const deltaY = swipe_det.eY - swipe_det.sY
        // Min swipe distance, you could use absolute value rather
        // than square. It just felt better for personnal use
        if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) return
        // horizontal
        if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
            direction = deltaX > 0 ? directions.RIGHT : directions.LEFT
        else // vertical
            direction = deltaY > 0 ? directions.UP : directions.DOWN

        if (direction && typeof func === 'function') func(el, direction)

        direction = null
    }, false)
}

function setKey(el, direction) {
    //el ignoriere ich, da ich die Funktion eh nur für ein Element nutze
    if (direction == "down" || direction == "up")
        key = direction == "down" ? "up" : "down";
    else
        key = direction;
}
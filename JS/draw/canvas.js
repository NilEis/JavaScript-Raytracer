/**
 * canvasClass ist eine Klasse, die das zugreifen auf das Canvas Objekt erleichtert.
 * @file Stellt Methoden zum Zugriff auf das HTML5 Canvas zur verfügung
 * @example
 * let c = new canvasClass("canvas", w, h, "green");
 */
class canvasClass {
    /**
     * Der Construktor der Funktion
     * @param {string} elem Die Id des Elements in das das Canvas eingefügt werden soll.
     * @param {string} canvas Der Name für für die Id des Canvas, welches der Constructor erzeugt.
     * @param {number} width Die Breite des Canvas.
     * @param {number} height Die Höhe des Canvas.
     * @param {string} [color= ""] Die Hintergrundfarbe des Canvas.
     * @example
     * let c = new canvasClass("canvas", w, h, "green");
     */
    constructor(elem, canvas, width, height, color = "") {
        let node = document.createElement("canvas");
        node.setAttribute("id", canvas);
        document.getElementById(elem).appendChild(node);
        /**
         * @member {canvas} canvasClass~canvas
         */
        this.canvas = document.getElementById(canvas);
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);
        /**
         * @member {Context} canvasClass~ctx
         */
        this.ctx = this.canvas.getContext("2d");
        this.canvas.style.backgroundColor = color;
        /**
         * @member {number} canvasClass~_rows
         */
        this._rows = 0;
        /**
         * @member {number} canvasClass~_columns
         */
        this._columns = 0;
        /**
         * @member {Array.<{name:string,x:number,y:number,w:number,h:number, draw: function, update: function}>|Array.<{name:string,x:number,y:number,r:number, draw: function, update: function}>} canvasClass~shapes
         */
        this.shapes = [];

        /**
         * @member {HTMLUListElement} canvasClass~listSh
         */
        this.listSh = document.createElement("ul");
    }

    /**
     * Gibt die hintergrundfarbe zurück
     * @type {string}
     * @returns {string}    Die Farbe des Hintergrunds
     * @example
     * console.log(c.background);
     */
    get background() {
        return this.canvas.style.backgroundColor;
    }

    /**
     * Setzt die Hintergrundfarbe
     * @param {string} c Die Farbe die als neuer Hintergrund gesetzt werden soll
     * @example
     * c.background = "Blue";
     */
    set background(c) {
        this.canvas.style.backgroundColor = c;
    }

    /**
     * Gibt das HTMLElement zurück, in dem sich die Liste befindet
     * @return {HTMLElement} Die Liste
     */
    get shapeList() {
        return this.listSh;
    }

    get rows() {
        return this._rows;
    }

    set rows(r) {
        this._rows = r;
    }

    get columns() {
        return this._columns;
    }

    set columns(r) {
        this._columns = r;
    }

    /**
     * Gibt die Breite des Canvas zurück
     * @type {number}
     * @returns {number} Die Breite des Canvas 
     * @example
     * console.log(c.width);
     */
    get width() {
        return this.canvas.width;
    }
    /**
     * Setzt eine neue Breite
     * @param {number} w Die neue breite des Canvas
     * @example
     * c.width = 800;
     */
    set width(w) {
        this.canvas.width = w;
    }

    /**
     * Gibt die höhe des canvas zurück
     * @type {number}
     * @returns {number} Die Höhe des Canvas 
     * @example
     * console.log(c.height);
     */
    get height() {
        return this.canvas.height;
    }
    /**
     * Setzt eine neue Höhe für das Canvas
     * @param h {number} Die neue höhe des Canvas
     * @example
     * c.height = 600;
     */
    set height(h) {
        this.canvas.height = h;
    }

    /**
     * 
     * @param {{name:string,x:number,y:number,w:number,h:number, draw:function}|{name:string,x:number,y:number,r:number, draw:function}} shape Das was gezeichnet werden soll
     */
    addShape(shape) {
        shape.id = this.shapes.length;
        this.shapes.push(shape);
        let tmp = document.createElement("li");
        tmp.innerHTML = "<button onclick='delete c.shapes[" + shape.id + "];c.updateList()'>Remove</button>" + shape.toString();
        this.listSh.appendChild(tmp);
    }

    /**
     * Fügt einen Kreis zum Canvas hinzu
     * @param {number} x x-Position
     * @param {number} y y-Position
     * @param {number} r Radius
     * @param {string} color Die Farbe
     */
    addCircle(x, y, r, color = "black") {
        c.addShape({
            name: "Circle",
            x: x,
            y: y,
            r: r,
            color: color,
            draw: function () {
                c.fillCircle(this.x, this.y, this.r, this.color);
            },
            update: function () {
                return;
            },
            toString: function () {
                return this.name + "{x: " + this.x + ", y: " + this.y + ", r: " + this.r + ", Color: " + this.color + "}";
            }
        });
    }

    /**
     * Aktualisiert die Liste der gezeichneten Objekte
     */
    updateList() {
        this.listSh.innerHTML = "";
        this.shapes.forEach(element => {
            let tmp = document.createElement("li");
            tmp.innerHTML = "<button onclick='delete c.shapes[" + element.id + "];c.updateList()'>Remove</button>" + element.toString();
            this.listSh.appendChild(tmp);
        });
    }

    /**
     * Zeichnet alle Objekte auf das Canvas
     */
    draw() {
        this.cls();
        this.shapes.forEach(element => {
            element.draw();
        });
    }

    /**
     * Die Funktion zeichnet einen Ausschnitt eines Bildes auf das Canvas
     * @param {Image} img Das Bild aus dem der Ausschnitt kommen soll
     * @param {number} ix Die x-Position des Bildabschnitts
     * @param {number} iy Die y-Position des Bildabschnitts
     * @param {number} iw Die Breite des bildabschnitts
     * @param {number} ih Die Höhe des Bildabschnitts
     * @param {number} x Die x-Position an der es gezeichnet werden soll
     * @param {number} y Die y-position an der es gezeichnet werden soll
     * @param {number} w Die Breite auf die es gestreckt werden soll
     * @param {number} h Die Höhe auf die es gestreckt werden soll.
     */
    drawSprite(img, ix, iy, iw, ih, x, y, w, h) {
        this.ctx.drawImage(img, ix, iy, iw, ih, x, y, w, h);
    }

    /**
     * Zeichnet ein Bild aufs canvas
     * @param {Image} image Das zu zeichnende Bild
     * @param {number} x Die x-Position des Bilds
     * @param {number} y Die y-Position des Bilds
     * @param {number} w Die Breite des Bilds
     * @param {number} h Die Höhe des Bilds
     */
    drawImage(image, x, y, w, h) {
        this.ctx.drawImage(image, x, y, w, h);
    }

    /**
     * Zeichnet die Zellen eines 2D Arrays auf das canvas
     * @param {number[][]} arr Das 2D Array
     * @param {string[]} colorArray Die Zahlen in den Zellen des 2D Arrays geben den Index für die Zellen mit der entsprechenden Farbe an
     * @param {number} [w = Math.floor(canvas.width / arr[0].length)] Die Breite jeder Zelle
     * @param {number} [h = Math.floor(canvas.height / arr.length)] Die Höhe jeder Zelle
     * @param {number} [xOffset = 0] Offset in x-Richtung
     * @param {number} [yOffset = 0] Offset in y-Richtung
     */
    fillArray2D(arr, colorArray, w = Math.floor(canvas.width / arr[0].length), h = Math.floor(canvas.height / arr.length), xOffset = 0, yOffset = 0) {
        let abstand = 0;
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[0].length; x++) {
                this.fillRect(x * w + abstand + xOffset, y * h + abstand + yOffset, w - abstand, h - abstand, colorArray[arr[y][x]], abstand == 0 ? false : true);
            }
        }
    }

    /**
     * Zeichnet die Zellen eines 1D Arrays auf das canvas
     * @param {number[]} arr Das 1D Array
     * @param {string[]} colorArray Die Zahlen in den Zellen des 2D Arrays geben den Index für die Zellen mit der entsprechenden Farbe an
     * @param {number} [w = Math.floor(canvas.width / arr[0].length)] Die Breite jeder Zelle
     * @param {number} [h = Math.floor(canvas.height / arr.length)] Die Höhe jeder Zelle
     * @param {number} [xOffset = 0] Offset in x-Richtung
     * @param {number} [yOffset = 0] Offset in y-Richtung
     */
    fillArray1D(arr, breite, colorArray, w = Math.floor(canvas.width / breite), h = Math.floor(canvas.height / (arr.length / breite)), xOffset = 0, yOffset = 0) {
        let abstand = 0;
        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                this.fillRect(x * w + abstand + xOffset, y * h + abstand + yOffset, w - abstand, h - abstand, colorArray[arr[y * breite + x]], true);
            }
        }
    }

    /**
     * Zeichnet die Zellen eines 1D Arrays auf das canvas
     * @param {number[]} arr Das 1D Array
     * @param {number} w Die Breite jeder Zelle
     * @param {number} h Die Höhe jeder Zelle
     * @param {number} x_ Offset in x-Richtung
     * @param {number} y Offset in y-Richtung
     */
    render(arr, breite, x_, y_, sizeX, sizeY, w, h) {
        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                this.fillRect(x * w + x_, y * h + y_, w, h, arr[y * breite + x]);
            }
        }
    }

    /**
     * Zeichnet die Zellen eines 2D Arrays auf das canvas
     * @param {number[][]} arr Das 2D Array
     * @param {Function} callback Die Farbe die genommen werden soll
     * @param {number} [w = Math.floor(canvas.width / arr[0].length)] Die Breite jeder Zelle
     * @param {number} [h = Math.floor(canvas.height / arr.length)] Die Höhe jeder Zelle
     * @param {number} [xOffset = 0] Offset in x-Richtung
     * @param {number} [yOffset = 0] Offset in y-Richtung
     */
    fillArrayCB(arr, callback, w = Math.floor(canvas.width / arr[0].length), h = Math.floor(canvas.height / arr.length), xOffset = 0, yOffset = 0) {
        let abstand = 0;
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[0].length; x++) {
                this.fillRect(x * w + abstand + xOffset, y * h + abstand + yOffset, w - abstand, h - abstand, callback(arr[y][x]), abstand == 0 ? false : true);
            }
        }
    }

    /**
     * Zeichnet die die Bilder in den Zellen eines 2D Arrays auf das canvas
     * @param {Image[][]} arr Das 2D Array, dass die Bilder enthält
     * @param {number} [w = Math.floor(canvas.width / arr[0].length)] Die Breite jeder Zelle
     * @param {number} [h = Math.floor(canvas.height / arr.length)] Die Höhe jeder Zelle
     * @param {number} [xOffset = 0] Offset in x-Richtung
     * @param {number} [yOffset = 0] Offset in y-Richtung
     */
    imageArray(arr, w = Math.floor(canvas.width / arr[0].length), h = Math.floor(canvas.height / arr.length), xOffset = 0, yOffset = 0) {
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[0].length; x++) {
                this.drawImage(arr[y][x], x * w + xOffset, y * h + yOffset, w, h);
            }
        }
    }

    /**
     * Schreibt einen Text aufs Canvas
     * @param {number} x Die x-Position des Texts
     * @param {number} y Die y-Position des Texts
     * @param {string} string Der zu zeichnende Text
     * @param {string} [font = "30px Arial"] Die zu benutzende Schriftart
     * @param {string} [color = "black"] Die zu benutzende Farbe
     */
    fillText(x, y, string, font = "30px Arial", color = "black") {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(string, x, y);
    }

    /**
     * Zeichnet ein den Umriss eines Rechtecks auf das Canvas
     * @param {number} x Die x-Position
     * @param {number} y Die y-Position
     * @param {number} w Die Breite
     * @param {number} h Die Höhe
     * @param {string} [color = "black"] Die Farbe der Umrandung
     */
    drawRect(x, y, w, h, color = "black") {
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, w, h);
    }

    /**
     * Zeichnet ein Rechteck auf das Canvas
     * @param {number} x Die x-Position
     * @param {number} y Die y-Position
     * @param {number} w Die Breite
     * @param {number} h Die Höhe
     * @param {string} color Die Farbe der Umrandung
     * @param {boolean} [border = false] Wenn wahr, wird eine Umrandung gezeichnet
     * @param {string} [bColor = "black"] Gibt die Farbe für die umrandung an
     */
    fillRect(x, y, w, h, color, border = false, bColor = "black") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        this.ctx.strokeStyle = bColor;
        if (border)
            this.ctx.strokeRect(x, y, w, h);
    }

    /**
     * Löscht alles was auf das Canvas gezeichnet wurde
     */
    cls() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);
    }

    /**
     * Die Methode zeichnet eine Linie auf das Canvas
     * @param {number} x1 Die Startposition auf der x-Achse
     * @param {number} y1 Die Startposition auf der y-Achse
     * @param {number} x2 Die Endposition auf der x-Achse
     * @param {number} y2 Die Endposition auf der y-Achse
     * @param {string} [color="black"] Die Farbe der Linie
     * @example
     * c.line(50,50,150,150,"black");
     */
    line(x1, y1, x2, y2, color = "black") {
        this.ctx.beginPath(0, 0);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }


    /**
     * Zeichnet eine Linie durch eine Reihe von Punkten
     * @param {number[][]} path Gibt die Punkte bei einem n Punkte langen Pfad in der Form [[x1,y1],[x2,y2],[xn,yn]] an
     * @param {string} [color = "black"] Gibt die farbe für den pfad an
     * @throws {InvalidPathLength} Wird geworfen, wenn der Pfad kürzer als zwei Punkte ist
     */
    drawPath(path, color = "black") {
        if (path.length <= 1)
            throw "InvalidPathLength";
        path.push([0, 0]);
        let tmp = path.pop();
        this.ctx.beginPath(tmp[0], tmp[1]);
        for (let i = 1; i < path.length; i++) {
            this.ctx.lineTo(path[i][0], path[i][1]);
        }
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    /**
     * Zeichnet einen Pfad durch eine Reihe von Punkten und schließt diesen am Ende
     * @param {number[][]} path Gibt die Punkte bei einem n Punkte langen Pfad in der Form [[x1,y1],[x2,y2],[xn,yn]] an
     * @param {string} [color = "black"] Gibt die farbe für den pfad an
     * @throws {InvalidPathLength} Wird geworfen, wenn der Pfad kürzer als drei Punkte ist
     */
    drawShape(path, color = "black") {
        if (path.length <= 2)
            throw "InvalidPathLength";
        path.push([0, 0]);
        let tmp = path.pop();
        this.ctx.beginPath(tmp[0], tmp[1]);
        while (path.length != 0) {
            tmp = path.pop();
            this.ctx.lineTo(tmp[0], tmp[1]);
        }
        this.ctx.strokeStyle = color;
        this.ctx.closePath();
        this.ctx.stroke();
    }

    /**
     * Zeichnet einen Pfad durch eine Reihe von Punkten und schließt und füllt diesen am Ende
     * @param {number[][]} path Gibt die Punkte bei einem n Punkte langen Pfad in der Form [[x1,y1],[x2,y2],[xn,yn]] an
     * @param {string} [color = "black"] Gibt die farbe für den pfad an
     * @param {boolean} [outline = "false"] Wenn wahr, wird der Umriss mit gezeichnet
     * @param {string} [strokeColor = "black"] Gibt die farbe für die Umrandung an
     * @throws {InvalidPathLength} Wird geworfen, wenn der Pfad kürzer als drei Punkte ist
     */
    fillShape(path, color = "black", outline = false, strokeColor = "black") {
        if (path.length <= 2)
            throw "InvalidPathLength";
        path.push([0, 0]);
        let tmp = path.pop();
        this.ctx.beginPath(tmp[0], tmp[1]);
        while (path.length != 0) {
            tmp = path.pop();
            this.ctx.lineTo(tmp[0], tmp[1]);
        }
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.closePath();
        if (outline)
            this.ctx.stroke();
        this.ctx.fill();
    }

    /**
     * Zeichnet den Umriss eines Kreises
     * @param {number} x Gibt die Position des Kreises an
     * @param {number} y Gibt die y-Position des Kreises an
     * @param {number} r Gibt den radius des Kreises an
     * @param {string} color Gibt die Farbe des Kreises an
     */
    drawCircle(x, y, r, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    /**
     * Zeichnet eine Kreises
     * @param {number} x Gibt die Position des Kreises an
     * @param {number} y Gibt die y-Position des Kreises an
     * @param {number} r Gibt den radius des Kreises an
     * @param {string} color Gibt die Farbe des Kreises an
     * @param {boolean} [outline=false] Wenn wahr, wird der umriss gezeichnet
     * @param {string} [outColor="blac"] Gibt die Farbe der Umrandung an
     */
    fillCircle(x, y, r, color, outline = false, outColor = "black") {
        this.ctx.strokeStyle = outColor;
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        if (outline)
            this.ctx.stroke();
        this.ctx.closePath();
    }

    /**
     * Macht das Canvas unscharf
     */
    blur() {
        let _c = document.getElementById(this.canvas.getAttribute("id"));
        let _ctx = _c.getContext("2d");
        _ctx.globalAlpha = 0.3;
        let _offset = 3;
        for (let i = 1; i <= 8; i += 1) {
            _ctx.drawImage(_c, _offset, 0, _c.width - _offset, _c.height, 0, 0, _c.width - _offset, _c.height);
            _ctx.drawImage(_c, 0, _offset, _c.width, _c.height - _offset, 0, 0, _c.width, _c.height - _offset);
        }
    }

    /**
     * Zeichnet ein Balkendiagramm mit den gegebenen Werten
     * @param {number[]} arr Die Werte in einem Array
     * @param {number} min Der kleinste Wert
     * @param {number} max Der größte Wert
     */
    plot(arr, min, max) {
        let tSize = this.width / arr.length;
        for (let i = 0; i < arr.length; i++) {
            this.fillRect(i * tSize, this.height - mapValue(arr[i], min, max, 0, this.height), tSize, mapValue(arr[i], min, max, 0, this.height), "white", true, "black");
        }
    }


    /**
     * Die Funktion konvertiert ein Canvas zu einem Bild.
     * @param {canvas} canvas Das zu konvertierende Canvas
     * @return {Image} Das Bild
     */
    static convertCanvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }
}
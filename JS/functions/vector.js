/**
 * @file Stellt die Klassen {@link vector2D} und {@link vector3D} zur verfügung
 * @example
 * let location2D = new vector2D(x, y);
 * let location3D = new vector3D(x, y, z);
 */
class vector2D {
    /**
     * Der Konstruktor setzt die Attribute x und y.
     * @param {number} x X ist die X Position des Vektors.
     * @param {number} y Y ist die Y Position des Vektors.
     */
    constructor(x, y) {
        /**
         * @type {number}
         */
        this.x = x;
        /**
         * @type {number}
         */
        this.y = y;
    }

    /**
     * Erstellt einen zufälligen 2D Vektor
     * @return {vector2D} Der generierte Vektor
     */
    static random2D() {
        let v = new vector2D(Math.random() * 10, Math.random() * 10);
        v.normalize();
        return v;
    }

    /**
     * Erzeugt einen Vektor aus dem gegebenen Winkel
     * @param {number} a Der Winkel in Grad
     */
    static fromAngle(a) {
        const angle = degToRad(a);
        const vx = 1 * Math.cos(angle);
        const vy = 1 * Math.sin(angle);
        return new vector2D(vx, vy);
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {vector2D} p2 Der Vektor der dem Eingabevektor dazu addiert wird
     * @return {vector2D} Erstellt einen Vektor aus der Summe von p1 und p2.
     */
    static add(p1, p2) {
        return new vector2D(p1.x + p2.x, p1.y + p2.y);
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {vector2D} p2 Der Vektor der dem Eingabevektor abgezogen wird
     * @return {vector2D} Erstellt einen Vektor aus der differenz von p1 und p2.
     */
    static sub(p1, p2) {
        return new vector2D(p1.x - p2.x, p1.y - p2.y);
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {number} v Die Zahl mit der p1 multipliziert wird
     * @return {vector2D} Erstellt einen Vektor aus dem Produkt von p1 und v.
     */
    static mul(p1, v) {
        return new vector2D(p1.x * v, p1.y * v);
    }

    /**
     * @param {vector2D} p1 Der Eingabevektor
     * @param {number} v Die Zahl durch die p1 dividiert wird
     * @return {vector2D} Erstellt einen Vektor aus dem quotienten von p1 und v.
     */
    static div(p1, v) {
        return new vector2D(p1.x / v, p1.y / v);
    }

    /**
     * Berechnet das Skalarprodukt zweier Vektoren
     * @param {vector2D} v1 
     * @param {vector2D} v2 
     * @return {number} Das Skalarprodukt
     */
    static scalarProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    /**
     * Berechnet den Winkel zwischen zwei Vektoren
     * @param {vector2D} v1 Vektor 1
     * @param {vector2D} v2 Vector 2
     * @return {number} Der Winkel in rad
     */
    static angle(v1, v2) {
        return Math.acos(vector2D.scalarProduct(v1, v2) / (v1.mag * v2.mag));
    }

    /**
     * @return {vector2D} Gibt eine Kopie des Vektors zurück
     */
    get() {
        let tmp = new vector2D(this.x, this.y);
        return tmp;
    }

    /**
     * Rundet die Werte des Vektors auf eine Grade Zahl
     */
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }


    /**
     * Addiert einen Vektor auf den aktuellen
     * @param {vector2D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    add(pVector) {
        this.x += pVector.x;
        this.y += pVector.y;
    }

    /**
     * Subtrahiert einen Vektor mit dem aktuellen
     * @param {vector2D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    sub(pVector) {
        this.x -= pVector.x;
        this.y -= pVector.y;
    }

    /**
     * Multipliziert den Vektor mit einem Wert
     * @param {number} pFloat Der Wert mit dem der Vektor multipliziert wird
     */
    mul(pFloat) {
        this.x *= pFloat;
        this.y *= pFloat;
    }

    /**
     * Dividiert den Vektor mit einer bestimmten zahl
     * @param {number} pFloat Der Wert, mit dem dividiert wird
     */
    div(pFloat) {
        this.x /= pFloat;
        this.y /= pFloat;
    }

    /**
     * Die methode vergleicht den Vektor mit einem anderen Vektor
     * @param {vector2D} pVector Der Vektor mit dem verglichen wird.
     * @return {boolean} Gibt true zurück wenn die x- und y-Werte der Vektoren gleich sind, sonst wird false zurückgegeben
     */
    cmp(pVector) {
        if (this.x == pVector.x && this.y == pVector.y)
            return true;
        return false;
    }

    /**
     * Normalisiert den Vektor; setzt die Länge auf 1
     */
    normalize() {
        if (this.mag == 0)
            return;
        this.div(this.mag);
    }

    /**
     * Die Methode verhindert, dass der Vektor länger als ein bestimmter Wert wird
     * @param {number} v Der Maximalwert
     */
    limit(v) {
        if (this.mag > v) {
            this.normalize();
            this.mul(v);
        }
    }


    /**
     * @return {string} Gibt die Werte des Vektors zurück
     */
    toString() {
        return "{ x: " + this.x + ", y: " + this.y + ", mag: " + this.mag + " }";
    }

    /**
     * Gibt die Länge des Vektors zurück
     * @type {number} */
    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

class vector3D {
    /**
     * Der Konstruktor setzt die Attribute x und y.
     * @param {number} x X ist die X Position des Vektors.
     * @param {number} y Y ist die Y Position des Vektors.
     * @param {number} z Z ist die Z Position des Vektors.
     */
    constructor(x, y, z) {
        /**
         * @type {number}
         */
        this.x = x;
        /**
         * @type {number}
         */
        this.y = y;
        /**
         * @type {number}
         */
        this.z = z;
    }

    /**
     * Erstellt einen zufälligen 3D Vektor
     * @return {vector3D} Der generierte Vektor
     */
    static random3D() {
        let v = new vector3D(Math.random() * 10, Math.random() * 10);
        v.normalize();
        return v;
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {vector3D} p2 Der Vektor der dem Eingabevektor dazu addiert wird
     * @return {vector3D} Erstellt einen Vektor aus der Summe von p1 und p2.
     */
    static add(p1, p2) {
        return new vector3D(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {vector3D} p2 Der Vektor der dem Eingabevektor abgezogen wird
     * @return {vector3D} Erstellt einen Vektor aus der differenz von p1 und p2.
     */
    static sub(p1, p2) {
        return new vector3D(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {number} v Die Zahl mit der p1 multipliziert wird
     * @return {vector3D} Erstellt einen Vektor aus dem Produkt von p1 und v.
     */
    static mul(p1, v) {
        return new vector3D(p1.x * v, p1.y * v, p1.z * v);
    }

    /**
     * @param {vector3D} p1 Der Eingabevektor
     * @param {number} v Die Zahl durch die p1 dividiert wird
     * @return {vector3D} Erstellt einen Vektor aus dem quotienten von p1 und v.
     */
    static div(p1, v) {
        return new vector3D(p1.x / v, p1.y / v, p1.z / v);
    }

    /**
     * Berechnet das Skalarprodukt zweier Vektoren
     * @param {vector3D} v1 
     * @param {vector3D} v2 
     * @return {number} Das Skalarprodukt
     */
    static scalarProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    /**
     * Berechnet den Winkel zwischen zwei Vektoren
     * @param {vector3D} v1 Vektor 1
     * @param {vector3D} v2 Vector 2
     * @return {number} Der Winkel in rad
     */
    static angle(v1, v2) {
        return Math.acos(vector3D.scalarProduct(v1, v2) / (v1.mag * v2.mag));
    }

    static crossProduct(v1, v2) {
        let x_, y_, z_;
        x_ = v1.y * v2.z - v1.z * v2.y;
        y_ = v1.z * v2.x - v1.x * v2.z;
        z_ = v1.x * v2.y - v1.y * v2.x;
        return new vector3D(x_, y_, z_);
    }

    /**
     * @return {vector3D} Gibt eine Kopie des Vektors zurück
     */
    get() {
        let tmp = new vector3D(this.x, this.y, this.z);
        return tmp;
    }


    /**
     * Addiert einen Vektor auf den aktuellen
     * @param {vector3D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    add(pVector) {
        this.x += pVector.x;
        this.y += pVector.y;
        this.z += pVector.z;
    }

    /**
     * Subtrahiert einen Vektor mit dem aktuellen
     * @param {vector3D} pVector Der Vektor, mit dem der aktuelle addiert wird
     */
    sub(pVector) {
        this.x -= pVector.x;
        this.y -= pVector.y;
        this.z -= pVector.z;
    }

    /**
     * Multipliziert den Vektor mit einem Wert
     * @param {number} pFloat Der Wert mit dem der Vektor multipliziert wird
     */
    mul(pFloat) {
        this.x *= pFloat;
        this.y *= pFloat;
        this.z *= pFloat;
    }

    /**
     * Dividiert den Vektor mit einer bestimmten zahl
     * @param {number} pFloat Der Wert, mit dem dividiert wird
     */
    div(pFloat) {
        this.x /= pFloat;
        this.y /= pFloat;
        this.z /= pFloat;
    }

    /**
     * Die methode vergleicht den Vektor mit einem anderen Vektor
     * @param {vector3D} pVector Der Vektor mit dem verglichen wird.
     * @return {boolean} Gibt true zurück wenn die x- und y- und z-Werte der Vektoren gleich sind, sonst wird false zurückgegeben
     */
    cmp(pVector) {
        if (this.x == pVector.x && this.y == pVector.y && this.z == pVector.z)
            return true;
        return false;
    }

    /**
     * Normalisiert den Vektor; setzt die Länge auf 1
     */
    normalize() {
        if (this.mag == 0)
            return;
        this.div(this.mag);
    }

    /**
     * Die Methode verhindert, dass der Vektor länger als ein bestimmter Wert wird
     * @param {number} v Der Maximalwert
     */
    limit(v) {
        if (this.mag > v) {
            this.normalize();
            this.mul(v);
        }
    }

    /**
     * @return {string} Gibt die Werte des Vektors zurück
     */
    toString() {
        return "{ x: " + this.x + ", y: " + this.y + ", z: " + this.z + ", mag: " + this.mag + " }";
    }

    /**
     * Gibt die Länge des Vektors zurück
     * @type {number} */
    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
}
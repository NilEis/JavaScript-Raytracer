class sphere {
    constructor(x, y, z, r, color, specular, reflective) {
        this.pos = new Vector3D(x, y, z);
        this.r = r;
        this.color = color;
        this.specular = specular;
        this.reflective = reflective;
    }
}
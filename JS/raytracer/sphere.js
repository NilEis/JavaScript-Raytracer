class sphere {
    constructor(x, y, z, r, color, specular, reflective) {
        this.pos = new vector3D(x, y, z);
        this.r = r;
        this.color = color;
        this.specular = specular;
        this.reflective = reflective;
    }
}

function IntersectRaySphere(origin, dir, sphere) {
    const oc = vector3D.sub(origin, sphere.pos);

    const k1 = vector3D.scalarProduct(dir, dir);
    const k2 = 2 * vector3D.scalarProduct(oc, dir);
    const k3 = vector3D.scalarProduct(oc, oc) - sphere.r * sphere.r;

    const discriminant = k2 * k2 - 4 * k1 * k3;
    if (discriminant < 0) {
        return [Infinity, Infinity];
    }

    const t1 = (-k2 + Math.sqrt(discriminant)) / (2 * k1);
    const t2 = (-k2 - Math.sqrt(discriminant)) / (2 * k1);
    return [t1, t2];
}
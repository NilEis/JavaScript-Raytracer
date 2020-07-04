class disk extends obj {
    constructor(x, y, z, nx, ny, nz, r, color, specular = 0.0, reflective = 0.0, transparency = 0.0, IndexOfRefrection = 1.0, emission = 0.0) {
        super(color, specular, reflective, transparency, IndexOfRefrection, emission);
        this.pos = new vector3D(x, y, z);
        this.normal = new vector3D(nx, ny, nz);
        this.normal.normalize();
        this.r = r;
    }
    getNormale(p) {
        return this.normal.get();
    }
}

function IntersectRayDisk(origin, dir, disk) {
    const den = vector3D.scalarProduct(dir, disk.normal);
    if (den == 0)
        return null;
    const num = vector3D.scalarProduct(vector3D.sub(disk.pos, origin), disk.normal);
    const t = num / den;
    const pointOfIntersection = vector3D.add(origin, vector3D.mul(dir, t));
    const PD = vector3D.sub(pointOfIntersection,disk.pos);
    if (PD.mag <= disk.r)
        return t;
    else
        return null;
}
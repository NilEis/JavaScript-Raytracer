class plane extends obj {
    constructor(x, y, z, nx, ny, nz, color, specular = 0.0, reflective = 0.0, transparency = 0.0, IndexOfRefrection = 1.0, emission = 0.0) {
        super(color, specular, reflective, transparency, IndexOfRefrection, emission);
        this.pos = new vector3D(x, y, z);
        this.normal = new vector3D(nx, ny, nz);
        this.normal.normalize();
    }
    getNormale(p){
        return this.normal.get();
    }
}

function IntersectRayPlane(origin, dir, plane) {
    return false;
}
class plane extends obj {
    constructor(x, y, z, nx, ny, nz, color, specular = 0.0, reflective = 0.0, transparency = 0.0, IndexOfRefrection = 1.0, emission = 0.0) {
        super(color, specular, reflective, transparency, IndexOfRefrection, emission);
        this.pos = new vector3D(x, y, z);
        this.normal = new vector3D(nx, ny, nz);
        this.normal.normalize();
    }
    getNormale(p) {
        return this.normal.get();
    }

    getColor(p) {
        const cValue = mapValue(Math.cos(p.x), -1, 1, 0, 1);
        //const cValueX = mapValue(Math.cos(p.x), -1, 1, 0, 255);
        //const cValueY = mapValue(Math.sin(p.y), -1, 1, 0, 255);
        //const _color_ = [cValueY, cValueX, 255];
        return mulRGB(this.color,cValue);
    }

    static from(json){
        //return Object.assign(new plane(), json);
        return new plane(json.pos.x,json.pos.y,json.pos.z,json.normal.x,json.normal.y,json.normal.z,json.color,json.specular,json.reflective,json.transparency,json.IOR, json.emission);
      }
}

function IntersectRayPlane(origin, dir, plane) {
    const den = vector3D.scalarProduct(dir, plane.normal);
    if (den == 0)
        return null;
    const num = vector3D.scalarProduct(vector3D.sub(plane.pos, origin), plane.normal);
    return num / den;
}
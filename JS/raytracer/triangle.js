class triangle extends obj {
    constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, n1, n2, n3, color, specular = 0.0, reflective = 0.0, transparency = 0.0, IndexOfRefrection = 1.0, emission = 0.0) {
        super(color, specular, reflective, transparency, IndexOfRefrection, emission);
        this.A = new vector3D(x1, y1, z1);
        this.B = new vector3D(x2, y2, z2);
        this.C = new vector3D(x3, y3, z3);
        this.normal = new vector3D(n1, n2, n3);
    }
    getNormale(p) {
        return this.normal.get();
    }

    getColor(p) {
        return this.color;
    }

    static fromVec3D(v1, v2, v3, n, color, specular = 0.0, reflective = 0.0, transparency = 0.0, IndexOfRefrection = 1.0, emission = 0.0) {
        return new triangle(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z, n.x, n.y, n.z, color, specular, reflective, transparency, IndexOfRefrection, emission);
    }

    static from(json) {
        //return Object.assign(new triangle(), json);
        return new triangle(json.A.x, json.A.y, json.A.z, json.B.x, json.B.y, json.B.z, json.C.x, json.C.y, json.C.z, json.normal.x, json.normal.y, json.normal.z, json.color, json.specular, json.reflective, json.transparency, json.IOR, json.emission);
    }
}

//http://webserver2.tecgraf.puc-rio.br/~mgattass/cg/trbRR/Fast%20MinimumStorage%20RayTriangle%20Intersection.pdf
function IntersectRayTriangle(origin, dir, triangle) {
    dir.normalize();
    const EPSILON = 0.00000000001;
    const vertex0 = triangle.A;
    const vertex1 = triangle.B;
    const vertex2 = triangle.C;
    const edge1 = vector3D.sub(vertex1, vertex0);
    const edge2 = vector3D.sub(vertex2, vertex0);;
    const h = vector3D.crossProduct(dir, edge2);
    const s = vector3D.sub(origin, vertex0);
    const a = vector3D.scalarProduct(edge1, h);
    if (a > -EPSILON && a < EPSILON) {
        return null; // This ray is parallel to this triangle.
    }
    const f = 1 / a;
    const u = f * vector3D.scalarProduct(s, h);
    if (u < 0 || u > 1) {
        return null;
    }
    const q = vector3D.crossProduct(s, edge1);
    const v = f * vector3D.scalarProduct(dir, q);
    if (v < 0 || u + v > 1) {
        return null;
    }
    // At this stage we can compute t to find out where the intersection point is on the line.
    const t = f * vector3D.scalarProduct(edge2, q);
    if (t > EPSILON) // ray intersection
    {
        return t; //vector3D.add(origin, vector3D.mul(dir, t));
    } else // This means that there is a line intersection but not a ray intersection.
    {
        return null;
    }
}
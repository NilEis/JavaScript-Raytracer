class triangle extends obj {
    constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, color, specular = 0.0, reflective = 0.0, transparency = 0.0, IndexOfRefrection = 1.0, emission = 0.0) {
        super(color, specular, reflective, transparency, IndexOfRefrection, emission);
        this.A = new vector3D(x1, y1, z1);
        this.B = new vector3D(x2, y2, z2);
        this.C = new vector3D(x3, y3, z3);
    }
    getNormale(p) {
        return vector3D.crossProduct(this.A, this.B);
    }
}

//http://webserver2.tecgraf.puc-rio.br/~mgattass/cg/trbRR/Fast%20MinimumStorage%20RayTriangle%20Intersection.pdf
function IntersectRayTriangle(origin, dir, triangle) {
    dir.normalize();
    const EPSILON = 0.0000001;
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
        return t;//vector3D.add(origin, vector3D.mul(dir, t));
    } else // This means that there is a line intersection but not a ray intersection.
    {
        return null;
    }
}


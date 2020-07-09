class light {
    constructor(type, intens, pos = null, dir = null) {
        this.type = type;
        this.intens = intens;
        this.pos = pos;
        this.dir = dir;
    }
    static from(json) {
        //console.log(json);
        return new light(json.type, json.intens, json.pos != null ? new vector3D(json.pos.x, json.pos.y, json.pos.z) : null, json.dir != null ? new vector3D(json.dir.x, json.dir.y, json.dir.z) : null);
    }
}

const AMBIENT = 0xABEFF;
const POINTLIGHT = 0xFFFFF;

function ComputeLighting(world, pos, norm, v, s) {
    let i = 0.0;
    let l;
    for (let j = 0; j < world.lights.length; j++) {
        let t_max;
        if (world.lights[j].type == AMBIENT) {
            i += world.lights[j].intens;
        } else {
            if (world.lights[j].type == POINTLIGHT) {
                l = vector3D.sub(world.lights[j].pos, pos);
                t_max = 1;
            } else {
                l = world.lights[j].dir.get();
                t_max = Infinity;
            }
            l.normalize();
            const retV = closestIntersection(world, pos, l, t_max, 0.00001);
            if (!retV) {
                shadow_sphere = retV[0];
                shadow_t = retV[1];
                let n_dot_l = vector3D.scalarProduct(norm, l);
                if (n_dot_l > 0)
                    i += world.lights[j].intens * n_dot_l / (norm.mag * l.mag)

                if (s != -1) {
                    let r = vector3D.sub(vector3D.mul(norm, 2 * vector3D.scalarProduct(norm, l)), l);
                    let r_dot_v = vector3D.scalarProduct(r, v);
                    if (r_dot_v > 0)
                        i += world.lights[j].intens * Math.pow(r_dot_v / r.mag * v.mag, s);
                }
            }
        }
    }
    return i;
}
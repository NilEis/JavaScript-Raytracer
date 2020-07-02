class light {
    constructor(type, intens, pos = null, dir = null) {
        this.type = type;
        this.intens = intens;
        this.pos = pos;
        this.dir = dir;
    }
}

const AMBIENT = 0xABEFF;
const POINTLIGHT = 0xFFFFF;

function ComputeLighting(world, pos, norm, v, s) {
    let i = 0.0;
    let l;
    for (let j = 0; j < world.lights.length; j++) {
        if (world.lights[j].type == AMBIENT) {
            i += world.lights[j].intens;
        } else {
            if (world.lights[j].type == POINTLIGHT) {
                l = vector3D.sub(world.lights[j].pos, pos);
            } else {
                l = world.lights[j].dir;
            }

            let {
                shadow_sphere,
                shadow_t
            } = closestIntersection(world, pos, l, 0.001, 500);
            if (shadow_sphere != null)
                console.log("Schattig");
            else {
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
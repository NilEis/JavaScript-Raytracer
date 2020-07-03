import {vector3D} from "../functions/vector";

function processTile(arr) {
    const dTop = new vector3D(arr[0].x, arr[0].y, arr[0].z);
    const POINT = new vector3D(arr[1].x, arr[1].y, arr[1].z);
    render(scene, POINT, dToP, arr[2] * arr[3], arr[4] * arr[5], arr[2] * arr[3] + arr[3], arr[4] * arr[5] + arr[5], WIDTH, HEIGHT, WIDTH / HEIGHT, 1, arr[6]).then((result) => {
        console.log(result)//c.render(result, arr[2] * arr[3], arr[4] * arr[5], arr[2] * arr[3] + arr[3], arr[4] * arr[5] + arr[5], 1, 1);
        console.log((WIDTH * HEIGHT) + ":" + result.length);
    }).catch((err) => {
        alert(err);
    });
}

onmessage = (e) => {
    processTile(e.data);
};
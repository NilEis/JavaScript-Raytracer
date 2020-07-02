function colorToRGB(arr) {
    return "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";
}

function normalToRGB(pV) {
    pV.normalize();
    const r = mapValue(pV.x, -1, 1, 0, 255);
    const g = mapValue(pV.y, -1, 1, 0, 255);
    const b = mapValue(pV.z, -1, 1, 0, 255);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function mulRGB(rgb, v) {
    return [clamp(rgb[0] * v, 0, 255), clamp(rgb[1] * v, 0, 255), clamp(rgb[2] * v, 0, 255)];
}
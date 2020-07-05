function getAsText(readFile) {

    const reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
}

function updateProgress(evt) {
    //Progress bar e.g.
}

function loaded(evt) {
    const fileString = evt.target.result;
    console.log(fileString);
    addTriangles(fileString);
}

function errorHandler(evt) {
    alert(evt.target.error);
}

function addTriangles(str) {
    const line = str.split("\n");
    for (let i = 0; i < line.length; i += 3) {
        const A = line[i].split(" ");
        const x1 = Number.parseFloat(A[1]);
        const y1 = Number.parseFloat(A[2]);
        const z1 = Number.parseFloat(A[3]);
        const B = line[i + 1].split(" ");
        const x2 = Number.parseFloat(B[1]);
        const y2 = Number.parseFloat(B[2]);
        const z2 = Number.parseFloat(B[3]);
        const C = line[i + 2].split(" ");
        const x3 = Number.parseFloat(C[1]);
        const y3 = Number.parseFloat(C[2]);
        const z3 = Number.parseFloat(C[3]);
        scene.triangles.push(new triangle(x1, y1, z1, x2, y2, z2, x3, y3, z3, [0, 255, 255], 100, 0.6));
    }
}
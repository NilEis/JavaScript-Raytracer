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
    const lines = str.split("\n");
    const normals = [];
    const vertices = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split(" ");
        switch (line[0]) {
            case '#':
                //Kommentar
                break;
            case 's':
                //Keine Ahnung was das ist
                break;
            case 'o':
                //Name des Objekts
                break;
            case 'v':
                vertices.push(new vector3D(Number.parseFloat(line[1]), Number.parseFloat(line[2]), Number.parseFloat(line[3])));
                break;
            case 'vn':
                normals.push(new vector3D(Number.parseFloat(line[1]), Number.parseFloat(line[2]), Number.parseFloat(line[3])));
                break;
            case 'f':
                let tmp = line[1].split('//');
                console.log(vertices);
                console.log(normals);
                console.log(line);
                console.log(tmp);
                const v1 = vertices[Number.parseInt(tmp[0]) - 1].get();
                tmp = line[2].split('//');
                console.log(tmp);
                const v2 = vertices[Number.parseInt(tmp[0]) - 1].get();
                tmp = line[3].split('//');
                console.log(tmp);
                const v3 = vertices[Number.parseInt(tmp[0]) - 1].get();
                const vn = normals[Number.parseInt(tmp[1]) - 1].get();;
                scene.triangles.push(triangle.fromVec3D(v1, v2, v3, vn, [0, 255, 255], 100, 0.6));
                break;
        }
    }
}
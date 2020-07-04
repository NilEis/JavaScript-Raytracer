class obj{
    constructor(color, specular=0.0, reflective=0.0, transparency=0.0, IndexOfRefrection=1.0, emission=0.0) {
        this.color = color;
        this.specular = specular;
        this.reflective = reflective;
        this.transparency = transparency;
        this.IOR = IndexOfRefrection;
        this.emission = emission;
    }
}
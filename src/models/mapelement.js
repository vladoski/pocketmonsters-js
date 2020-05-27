class MapElement {
    constructor(id = null, name = '', lat = 0.0, lon = 0.0, size = null, type = null) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.size = size;
        this.type = type;
    }
}

export default MapElement;
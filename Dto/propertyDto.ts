class Property {
    private _id: number;
    private _direccion: string;
    private _descripcion: string;
    private _imagen: string; // Se espera base64 o url
    private _precio: number;
    private _estado: 'Vendida' | 'Alquilada' | 'Disponible';
    private _id_persona: number;
    private _id_tipo_propiedad: number;

    constructor(
        direccion: string,
        descripcion: string,
        imagen: string,
        precio: number,
        estado: 'Vendida' | 'Alquilada' | 'Disponible',
        id_persona: number,
        id_tipo_propiedad: number,
        id_propiedad: number=0,
    ) {
        this._id = id_propiedad;
        this._direccion = direccion;
        this._descripcion = descripcion;
        this._imagen = imagen;
        this._precio = precio;
        this._estado = estado;
        this._id_persona = id_persona;
        this._id_tipo_propiedad = id_tipo_propiedad;
    }

    get id_propiedad(): number { return this._id; }
    get direccion(): string { return this._direccion; }
    get descripcion(): string { return this._descripcion; }
    get imagen(): string { return this._imagen; }
    get precio(): number { return this._precio; }
    get estado(): 'Vendida' | 'Alquilada' | 'Disponible' { return this._estado; }
    get id_persona(): number { return this._id_persona; }
    get id_tipo_propiedad(): number { return this._id_tipo_propiedad; }

    set id_propiedad(value: number) { this._id = value; }
    set direccion(value: string) { this._direccion = value; }
    set descripcion(value: string) { this._descripcion = value; }
    set imagen(value: string) { this._imagen = value; }
    set precio(value: number) { this._precio = value; }
    set estado(value: 'Vendida' | 'Alquilada' | 'Disponible') { this._estado = value; }
    set id_persona(value: number) { this._id_persona = value; }
    set id_tipo_propiedad(value: number) { this._id_tipo_propiedad = value; }
}

export default Property;
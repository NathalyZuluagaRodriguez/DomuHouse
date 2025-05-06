class User {

    private _nombre: string;
    private _apellido: string;
    private _email: string;
    private _telefono: string;
    private _Password: string;
    private _id_rol: number;

    constructor(
        nombre: string,
        apellido: string,
        email: string,
        telefono: string,
        password: string,
        id_rol: number
    ) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._email = email;
        this._telefono = telefono;
        this._Password = password;
        this._id_rol = id_rol;
    }

    //Getters
    get nombre(): string {
        return this._nombre;
    }
    get apellido(): string {
        return this._apellido;
    }
    get email(): string {
        return this._email;
    }

    get telefono(): string {
        return this._telefono;
    }

    get password(): string {
        return this._Password;
    }

    get id_rol(): number {
        return this._id_rol;
    }
    //Setters
    set nombre(nombre: string) {
        this._nombre = nombre;
    }
    set apellido(apellido: string) {
        this._apellido = apellido;
    }
    set email(email: string) {
        this._email = email;
    }

    set telefono(telefono: string) {
        this._telefono = telefono;
    }

    set password(password: string) {
        this._Password = password;
    }
    
    set id_rol(id_rol: number) {
        this._id_rol = id_rol;
    }

}

export default User;
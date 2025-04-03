class User {
    
    private _email: string;
    private _nombre: string;
    private _password: string

    constructor(
        email: string, nombres: string,
        password: string
    ) {
        this._email = email;
        this._nombre = nombres;
        this._password = password
    }

    // Getters
    get email(): string {
        return this._email;
    }

    get nombres(): string {
        return this._nombre;
    }
    
    get password(): string {
        return this._password;
    }

    // Setters
    set email(email: string) {
        this._email = email;
    }

    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    set password(password: string) {
        this._password = password;
    }
}

export default User;
class Agent {
    private _nombre: string;
    private _email: string;
    private _telefono: string;
    private _password: string;
    private _inmobiliariaId: number;
    public _id_rol: number

    constructor(nombre: string, email: string, telefono: string, password: string, inmobiliariaId: number, id_rol: number) {
      this._nombre = nombre;
      this._email = email;
      this._telefono = telefono;
      this._password = password;
      this._inmobiliariaId = inmobiliariaId;
      this. _id_rol = id_rol
    }

    get nombre() { return this._nombre; }
    get email() { return this._email; }
    get telefono() { return this._telefono; }
    get password() { return this._password; }
    get inmobiliariaId() { return this._inmobiliariaId; }
    get id_rol () { return this._id_rol; }

    set nombre(nombre: string) { this._nombre = nombre; }
    set email(email: string) { this._email = email; }
    set telefono(telefono: string) { this._telefono = telefono; }
    set password(password: string) { this._password = password; }
    set inmobiliariaId(id: number) { this._inmobiliariaId = id; }
    set id_rol(id: number) { this._id_rol = id; }

  }

  export default Agent;
import db from '../config/config-db'; 
import { RowDataPacket } from 'mysql2';


// Definir el tipo para la respuesta esperada de la consulta
type QueryResult = RowDataPacket & {
  'COUNT(*)': number; 
};

export const checkInmobiliariaExists = async (inmobiliariaId: number): Promise<boolean> => {
  const query = 'SELECT COUNT(*) FROM Inmobiliaria WHERE id_inmobiliaria = ?'; // Corregido: "Inmobiliaria" en singular como está en la BD
  
  // Ejecutar la consulta y asegurarse de que la respuesta es del tipo adecuado
  const [result] = await db.execute<QueryResult[]>(query, [inmobiliariaId]);
  
  // Ahora TypeScript sabe que result es un array de QueryResult
  return result[0]['COUNT(*)'] > 0;
};

interface NuevaInmobiliaria {
    nombre: string;
    telefono: string;
    correo: string;
    id_persona: number;
}

const buscarPorNombreOCorreo = async (nombre: string, correo: string) => {
    const [rows]: any = await db.query(
        "SELECT * FROM Inmobiliaria WHERE nombre = ? OR correo = ?",
        [nombre, correo]
    );
    return rows.length > 0;
};

const crearInmobiliaria = async (data: NuevaInmobiliaria) => {
    const { nombre, telefono, correo, id_persona } = data;

    const [resultado]: any = await db.query(
        `INSERT INTO Inmobiliaria (nombre, telefono, correo, num_propiedades, id_persona)
         VALUES (?, ?, ?, 0, ?)`,
        [nombre, telefono, correo, id_persona]
    );

    return resultado.affectedRows === 1;
};

const verificarSiYaEsAdministrador = async (id_persona: number) => {
    const [rows]: any = await db.query(
        "SELECT * FROM Inmobiliaria WHERE id_persona = ?",
        [id_persona]
    );
    return rows.length > 0;
};

const existePersona = async (id_persona: number) => {
    const [rows]: any = await db.query(
        "SELECT * FROM Persona WHERE id_persona = ?",
        [id_persona]
    );
    return rows.length > 0;
};

const obtenerCorreoPersona = async (id_persona: number): Promise<string | null> => {
    const [rows]: any = await db.query(
        "SELECT correo FROM Persona WHERE id_persona = ?",
        [id_persona]
    );
    return rows.length > 0 ? rows[0].correo : null;
};


export default {
    buscarPorNombreOCorreo,
    crearInmobiliaria,
    verificarSiYaEsAdministrador,
    existePersona,
    obtenerCorreoPersona
};


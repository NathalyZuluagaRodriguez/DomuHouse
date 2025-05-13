import db from '../config/config-db';
import bcrypt from "bcryptjs";
import User from '../Dto/UserDto';
import Login from '../Dto/loginDto';
import Agent from '../Dto/AgentsDto';
import pool from '../config/config-db'; 
import { RowDataPacket } from 'mysql2'; 
import { ResultSetHeader } from 'mysql2'; 

class usuarioRepo {

  static async createUsuario( usuario:User){
      const sql = 'CALL CrearUsuario(?, ?, ?, ?)';
      const values = [usuario.nombre, usuario.email, usuario.telefono,usuario.password];
      return db.execute(sql, values);
  }

  static async createAgente(agente: Agent) {
    const sql = 'CALL CrearAgente(?, ?, ?, ?, ?, ?, ?)';
    const values = [
      agente.nombre,
      agente.apellido,
      agente.telefono,
      agente.email,
      agente.password,
      agente.id_inmobiliaria,
      agente.id_rol
    ];
    try {
      const [rows]: any = await db.execute(sql, values);
      return rows;
    } catch (error) {
      console.error("❌ Error ejecutando procedimiento CrearAgente:", error);
      throw error;
    }
  }
    
  static async buscarUsuario(login: Login) {
    const sql = 'call loginUsuario(?)';
    const values = [login.email];
    const [rows]: any = await db.execute(sql, values);

    if (rows.length > 0) {
      const usuario = rows[0][0];
      
      console.log("🔍 Usuario encontrado:", usuario); // Verifica que la contraseña se esté recuperando correctamente

      if (!usuario.password) {
        throw new Error("El usuario no tiene contraseña almacenada");
      }

      // Compara la contraseña ingresada con el hash almacenado
      const isPasswordValid = await bcrypt.compare(login.password, usuario.password);

      if (isPasswordValid) {
        return { logged: true, status: "Successful authentication", id: usuario.id_usuario };
      }

      return { logged: false, status: "Invalid password" };
 
    }
    return { logged: false, status: "Invalid username or password" };

  }

   static async checkInmobiliariaExists(inmobiliariaId: number): Promise<boolean> {
    const query = 'SELECT COUNT(*) FROM Inmobiliaria WHERE id_inmobiliaria = ?';
    
    const [result] = await db.execute<RowDataPacket[]>(query, [inmobiliariaId]);
    
    return result[0]['COUNT(*)'] > 0;
  }

  static async insertSolicitud(
    nombre: string,
    apellido: string,
    correo: string,
    telefono: string,
    password: string,
    idInmobiliaria: number
  ): Promise<ResultSetHeader> {
    // Verificar si la inmobiliaria existe
    const exists = await this.checkInmobiliariaExists(idInmobiliaria);
    if (!exists) {
      throw new Error('La inmobiliaria especificada no existe');
    }

    const [res] = await db.execute<ResultSetHeader>(
      "INSERT INTO SolicitudIngreso (nombre, apellido, correo, telefono, password, id_inmobiliaria) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, apellido, correo, telefono, password, idInmobiliaria]
    );
    return res;
  }

  // RF03.3: Listar solicitudes pendientes
  static async listSolicitudes(): Promise<RowDataPacket[]> {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT s.*, i.nombre as nombre_inmobiliaria FROM SolicitudIngreso s JOIN Inmobiliaria i ON s.id_inmobiliaria = i.id_inmobiliaria WHERE s.estado = 'Pendiente'"
    );
    return rows;
  }

  // RF03.3: Aprobar solicitud
  static async approveSolicitud(id: number): Promise<void> {
    // Obtener la solicitud
    const [[sol]] = await db.query<RowDataPacket[]>(
      "SELECT * FROM SolicitudIngreso WHERE id_solicitud = ?",
      [id]
    );
    if (!sol) throw new Error('Solicitud no encontrada');
    
    // Crear agente utilizando el procedimiento almacenado
    await db.execute(
      "CALL CrearAgenteConToken(?, ?, ?, ?, ?, ?)",
      [sol.nombre, sol.apellido, sol.correo, sol.telefono, sol.password, sol.id_inmobiliaria]
    );
    
    // Marcar como aprobada
    await db.execute(
      "UPDATE SolicitudIngreso SET estado = 'Aprobada' WHERE id_solicitud = ?", 
      [id]
    );
  }

  // RF03.4: Rechazar solicitud
  static async rejectSolicitud(id: number, justificacion?: string): Promise<void> {
    await db.execute(
      "UPDATE SolicitudIngreso SET estado = 'Rechazada', justificacion = ? WHERE id_solicitud = ?",
      [justificacion || null, id]
    );
  }

  // RF03.4: Cancelar solicitud por usuario
  static async cancelSolicitud(id: number): Promise<void> {
    await db.execute(
      "DELETE FROM SolicitudIngreso WHERE id_solicitud = ?",
      [id]
    );
  }

  static async verificarCorreoUnico(correo: string): Promise<boolean> {
  const sql = 'SELECT COUNT(*) as count FROM Persona WHERE correo = ?';
  const [rows]: any = await db.execute(sql, [correo]);
  return rows[0].count === 0; // Retorna true si el correo no existe
}
}
export default usuarioRepo;

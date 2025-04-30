import db from '../config/config-db';

export class AgendaRepository {
  async crearVisita(fecha_visita: string, id_propiedad: number, id_persona: number) {
    const [result] = await db.execute(
      'INSERT INTO Visita (fecha_visita, id_propiedad, id_persona) VALUES (?, ?, ?)',
      [fecha_visita, id_propiedad, id_persona]
    );
    return result;
  }

  async obtenerVisitasPorUsuario(id_persona: number) {
    const [rows] = await db.execute(
      'SELECT * FROM Visita WHERE id_persona = ?',
      [id_persona]
    );
    return rows;
  }

  async actualizarVisita(id_visita: number, fecha_visita: string) {
    const [result] = await db.execute(
      'UPDATE Visita SET fecha_visita = ? WHERE id_visita = ?',
      [fecha_visita, id_visita]
    );
    return result;
  }

  async confirmarVisita(id_visita: number) {
    const [result] = await db.execute(
      "UPDATE Visita SET estado = 'Confirmada' WHERE id_visita = ?",
      [id_visita]
    );
    return result;
  }

  async obtenerDisponibilidad(fecha: string) {
    const [rows] = await db.execute(
      'SELECT * FROM Visita WHERE DATE(fecha_visita) = ?',
      [fecha]
    );
    return rows;
  }
}

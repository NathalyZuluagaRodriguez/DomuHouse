import db from '../config/config-db';

export class PropertyRepository {
  static async create(property: any) {
    const sql = `CALL CrearPropiedad(?, ?, ?, ?, ?, ?)`;
    const values = [
      property.titulo,
      property.descripcion,
      property.precio,
      property.ubicacion,
      property.tipo, // venta/alquiler
      property.usuario_id
    ];
    const [rows]: any = await db.execute(sql, values);
    return rows;
  }
}

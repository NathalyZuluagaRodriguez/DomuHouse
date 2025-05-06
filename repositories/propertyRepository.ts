import db from '../config/config-db';
import Property from '../Dto/propertyDto'

export class PropertyRepository {
  static async CreateProperty(property: Property) {
    const sql = `CALL CrearPropiedad(?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      property.direccion,
      property.descripcion,
      property.imagen,
      property.precio,
      property.estado,
      property.id_persona,
      property.id_tipo_propiedad
    ];
    const [rows]: any = await db.execute(sql, values);
    return rows; 
  }

  static async getAll() {
    const sql = `SELECT * FROM propiedad`;
    const [rows]: any = await db.execute(sql);
    return rows;
  }

  static async getById(id: number) {
    const sql = `SELECT * FROM propiedad WHERE id_propiedad = ?`;
    const [rows]: any = await db.execute(sql, [id]);
    
    console.log("Resultado de la consulta por ID:", rows);
    
    return rows.length > 0 ? rows[0] : null;
}


}

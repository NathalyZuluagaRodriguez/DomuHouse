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
}

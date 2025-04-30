import db from '../config/config-db';

export class PropertyRepository {
  // Crear propiedad
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

  // Búsqueda avanzada
  static async buscarPropiedadesAvanzado(filtros: {
    tipo?: string;
    estado?: string;
    precio_min?: number;
    precio_max?: number;
    direccion?: string;
  }): Promise<any[]> {
    let sql = `SELECT * FROM Propiedad WHERE 1=1`;
    const values: any[] = [];

    if (filtros.tipo) {
      sql += ` AND id_tipo_propiedad = ?`; // Cambia a JOIN si quieres buscar por nombre
      values.push(filtros.tipo);
    }

    if (filtros.estado) {
      sql += ` AND estado = ?`;
      values.push(filtros.estado);
    }

    if (filtros.precio_min !== undefined) {
      sql += ` AND precio >= ?`;
      values.push(filtros.precio_min);
    }

    if (filtros.precio_max !== undefined) {
      sql += ` AND precio <= ?`;
      values.push(filtros.precio_max);
    }

    if (filtros.direccion) {
      sql += ` AND direccion LIKE ?`;
      values.push(`%${filtros.direccion}%`);
    }

    const [rows]: any = await db.execute(sql, values);
    return rows;
  }
}

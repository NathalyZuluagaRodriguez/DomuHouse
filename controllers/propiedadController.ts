import { Request, Response } from 'express';
import Promisepool from '../config/config-db';

export const crearPropiedad = async (req: Request, res: Response) => {
  try {
    const {
      direccion, descripcion, imagen, precio, estado, id_persona, id_tipo_propiedad,
      estrato, ciudad, barrio, tipo_operacion, habitaciones, banos, parqueaderos,
      area_construida, area_total, latitud, longitud
    } = req.body;

    const [result] = await Promisepool.query(
      'CALL sp_crear_propiedad(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        direccion, descripcion, imagen, precio, estado, id_persona, id_tipo_propiedad,
        estrato, ciudad, barrio, tipo_operacion, habitaciones, banos, parqueaderos,
        area_construida, area_total, latitud, longitud
      ]
    );

    res.status(201).json({ mensaje: 'Propiedad creada exitosamente', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la propiedad' });
  }
};

export const editarPropiedad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      direccion, descripcion, precio, estado,estrato, ciudad, barrio, tipo_operacion, habitaciones, banos, parqueaderos,
      area_construida, area_total, latitud, longitud
    } = req.body;

    const [result] = await Promisepool.query(
      'CALL sp_editar_propiedad(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id, direccion, descripcion, precio, estado,estrato, ciudad, barrio, tipo_operacion, habitaciones, banos, parqueaderos,
        area_construida, area_total, latitud, longitud
      ]
    );

    res.json({ mensaje: 'Propiedad actualizada exitosamente', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar la propiedad' });
  }
};

export const eliminarPropiedad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Promisepool.query('CALL sp_eliminar_propiedad(?)', [id]);
    res.json({ mensaje: 'Propiedad eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
  }
};

export const aprobarPropiedad = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Promisepool.query('CALL sp_aprobar_propiedad(?)', [id]);
    res.json({ mensaje: 'Propiedad aprobada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al aprobar la propiedad' });
  }
};

export const obtenerPropiedadesPorTipo = async (req: Request, res: Response) => {
  try {
    const { id_tipo_propiedad } = req.params;

    // Verifica que id_tipo_propiedad sea un número válido
    if (isNaN(Number(id_tipo_propiedad))) {
      return res.status(400).json({ error: 'El ID de tipo de propiedad debe ser un número válido' });
    }

    // Consulta para obtener propiedades filtradas por tipo
    const [result] = await Promisepool.query(
      'SELECT * FROM Propiedad WHERE id_tipo_propiedad = ?',
      [id_tipo_propiedad]
    );

    if (Array.isArray(result) && result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron propiedades para este tipo' });
    }

    res.json({ propiedades: result });
  } catch (error: any) {
    console.error('Error al obtener propiedades por tipo:', error);
    res.status(500).json({ error: error.sqlMessage || 'Error interno' });
  }
};


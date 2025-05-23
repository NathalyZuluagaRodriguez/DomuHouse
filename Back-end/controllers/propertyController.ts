import { Request, Response } from 'express';
import Promisepool from '../config/config-db';

export const crearPropiedad = async (req: Request, res: Response) => {
  try {
    console.log('Datos recibidos para crear propiedad:', req.body);

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
    console.error('Error en crearPropiedad:', error);
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

export const obtenerPropiedades = async (req: Request, res: Response) => {
  try {
    const [result] = await Promisepool.query('CALL sp_obtener_propiedades()');

    // Validamos si la respuesta tiene datos
    const propiedades = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : [];

    res.json(propiedades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las propiedades' });
  }
};

export const obtenerPropiedadesAprobadas = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await Promisepool.query('CALL sp_listar_propiedades_aprobadas()');
    const propiedades = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : [];
    res.json(propiedades);
  } catch (error) {
    console.error("Error al obtener propiedades:", error);
    res.status(500).json({ error: 'Error al obtener las propiedades' });
  }
};


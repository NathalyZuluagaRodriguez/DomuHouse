import { Router } from 'express';
import { PropertyRepository } from '../repositories/propertyRepository';

const router = Router();

// GET /busqueda
router.get('/busqueda', async (req, res) => {
  try {
    const { tipo, estado, precio_min, precio_max, direccion } = req.query;

    const propiedades = await PropertyRepository.buscarPropiedadesAvanzado({
      tipo: tipo?.toString(),
      estado: estado?.toString(),
      precio_min: precio_min ? Number(precio_min) : undefined,
      precio_max: precio_max ? Number(precio_max) : undefined,
      direccion: direccion?.toString()
    });

    res.status(200).json(propiedades);
  } catch (error) {
    console.error('Error en búsqueda avanzada:', error);
    res.status(500).json({ message: 'Error en la búsqueda avanzada' });
  }
});

export default router;

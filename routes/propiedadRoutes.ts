import { Router } from 'express';
import {
  crearPropiedad,
  editarPropiedad,
  eliminarPropiedad,
  aprobarPropiedad
} from '../controllers/propiedadController';

const router = Router();

router.post('/propiedades', crearPropiedad);
router.put('/propiedades/:id', editarPropiedad);
router.delete('/propiedades/:id', eliminarPropiedad);
router.put('/propiedades/aprobar/:id', aprobarPropiedad);

export default router;

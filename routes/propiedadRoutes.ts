import { Router } from 'express';
import {
  crearPropiedad,
  editarPropiedad,
  eliminarPropiedad,
  aprobarPropiedad,
  obtenerPropiedadesPorTipo,
} from '../controllers/propiedadController';

const router = Router();

router.post('/propiedades', crearPropiedad);
router.put('/propiedades/:id', editarPropiedad);
router.delete('/propiedades/:id', eliminarPropiedad);
router.put('/propiedades/aprobar/:id', aprobarPropiedad);
router.get('/propiedades/tipo/:id_tipo_propiedad', obtenerPropiedadesPorTipo);


export default router;

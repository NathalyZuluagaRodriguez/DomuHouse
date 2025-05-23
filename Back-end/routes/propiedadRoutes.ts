import { Router } from 'express';
import {
  crearPropiedad,
  editarPropiedad,
  eliminarPropiedad,
  aprobarPropiedad,
  obtenerPropiedades,
  obtenerPropiedadesAprobadas
} from '../controllers/propertyController';

const router = Router();

router.post('/', crearPropiedad);
router.put('/:id', editarPropiedad);
router.delete('/:id', eliminarPropiedad);
router.put('/aprobar/:id', aprobarPropiedad);
router.get('/', obtenerPropiedades);
router.get('/aprobadas', obtenerPropiedadesAprobadas);


export default router;
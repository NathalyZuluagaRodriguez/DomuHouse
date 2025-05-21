import { Router } from 'express';
import {
  registrarIndependiente,
  validarCorreoIndependiente,
  confirmarRegistroIndependiente
} from '../controllers/independienteController';

const router = Router();

router.post('/registro', registrarIndependiente);
router.post('/validar-correo', validarCorreoIndependiente);
router.post('/confirmar-registro', confirmarRegistroIndependiente);

export default router;
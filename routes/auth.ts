import { Router } from 'express';
import { validarCorreo, verificarCodigo } from '../controllers/authController';

const router = Router();

router.post('/validar-correo', validarCorreo);
router.post('/verificar-codigo', verificarCodigo);

export default router;

import { Router } from 'express';
import { validarCorreo, verificarCodigo } from '../controllers/authController';
import { recuperarContrasena, restablecerContrasena } from '../controllers/authController';
import { confirmarRegistro } from '../controllers/authController';




const router = Router();

router.post('/validar-correo', validarCorreo);
router.post('/verificar-codigo', verificarCodigo);
router.post('/recuperar-contrasena', recuperarContrasena);
router.post('/restablecer-contrasena', restablecerContrasena);
router.post('/confirmar-registro', confirmarRegistro);


export default router;

import express from 'express';
import { register, login, deleteUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', deleteUser); // ✅ Ruta de eliminación

export default router;

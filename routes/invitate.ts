// routes/invitacionRoutes.ts
import { Router } from 'express';
import { generarInvitacion } from '../controllers/invitateController';

const router = Router();

router.post('/generar-token', generarInvitacion);

export default router;

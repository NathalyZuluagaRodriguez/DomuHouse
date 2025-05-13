import { Router } from 'express';
import {
  registerWithTokenController,
  requestJoinController,
  listRequestsController,
  approveRequestController,
  rejectRequestController,
  cancelRequestController
} from '../controllers/agentTokenController';
import registerAgent from "../controllers/registerAgentController";

const router = Router();
router.post('/registro-token', registerWithTokenController);           // RF03.1
router.post('/solicitud-ingreso', requestJoinController);            // RF03.2
router.get('/solicitudes', listRequestsController);                   // RF03.3
router.post('/solicitudes/:id/aprobar', approveRequestController);    // RF03.3
router.post('/solicitudes/:id/rechazar', rejectRequestController);    // RF03.4
router.delete('/solicitudes/:id/cancelar', cancelRequestController);  // RF03.4
router.post("/registro-agente", registerAgent);
export default router;


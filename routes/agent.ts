import express from "express";
import registerAgent from "../controllers/registerAgentController";

const router = express.Router();

router.post("/registro-agente", registerAgent);

export default router;
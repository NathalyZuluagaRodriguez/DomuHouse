import { Router } from "express";
import registrarInmobiliaria from "../controllers/inmobiliariaController";

const router = Router();

router.post("/inmobiliarias",registrarInmobiliaria);

export default router;

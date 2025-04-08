// routes/visita.ts

import express from "express";
import visitaController from "../controllers/visitController";

// Crear una instancia del router de Express
const router = express.Router();

// Ruta POST para registrar una nueva visita
// Endpoint: POST /api/visita
router.post("/", visitaController.register);

// Exportamos el router para usarlo en app.ts
export default router;

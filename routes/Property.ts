import express from "express";
import registerProperty from "../controllers/propertyController"

const router = express.Router();

router.post("/registro-propiedad", registerProperty);

export default router;

import express from "express";
import registerProperty from "../controllers/propertyController"
import getProperties from "../controllers/getPropertiesController";
import getPropertyById from "../controllers/getPropertyByIdController";

const router = express.Router();

router.post("/", registerProperty);
router.get("/inmuebles", getProperties);
router.get("/inmuebles/:id", getPropertyById);

export default router;

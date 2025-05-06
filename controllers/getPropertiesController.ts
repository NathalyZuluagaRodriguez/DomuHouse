import { Request, Response } from "express";
import propertyServi from "../services/propertyServices";

const getProperties = async (req: Request, res: Response) => {
    try {
        const propiedades = await propertyServi.getAllProperties();
        return res.status(200).json(propiedades);
    } catch (error) {
        console.error("Error al obtener propiedades:", error);
        return res.status(500).json({ error: "Error al obtener propiedades" });
    }
};

export default getProperties;

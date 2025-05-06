import { Request, Response } from "express";
import propertyServi from "../services/propertyServices";

const getPropertyById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const propiedad = await propertyServi.getByIdProperty(id);

        if (!propiedad) {
            return res.status(404).json({ message: "Propiedad no encontrada" });
        }

        return res.status(200).json(propiedad);
    } catch (error) {
        console.error("Error detallado:", error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};


export default getPropertyById;
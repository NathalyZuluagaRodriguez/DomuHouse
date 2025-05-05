import { Request, Response } from "express";
import propertyServi from "../services/propertyServices";
import Property from "../Dto/propertyDto";

const registerProperty = async (req: Request, res: Response) => {
    try {
        console.log("Datos recibidos:", req.body);

        const { direccion, descripcion, precio, estado, id_persona, imagen, id_tipo_propiedad } = req.body;

        const propiedad = new Property(direccion, descripcion, imagen, precio, estado, id_persona, id_tipo_propiedad);

        const result = await propertyServi.registerProperty(propiedad);

        return res.status(201).json({ message: "Propiedad registrada correctamente", propiedad: result });
    } catch (error: any) {
        console.error("Error al registrar propiedad:", error);
        return res.status(500).json({ error: "Error al registrar propiedad" });
    }
};

export default registerProperty;


import { Request, Response } from "express";
import inmobiliariaServi from "../services/inmobiliariaServices";

const registrarInmobiliaria = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const campos = ["nombre", "telefono", "correo", "direccion", "descripcion", "id_persona"];
        for (const campo of campos) {
            if (!data[campo]) {
                return res.status(400).json({ mensaje: `Falta el campo: ${campo}` });
            }
        }

        await inmobiliariaServi.registrarInmobiliaria(data);
        res.status(201).json({ mensaje: "Inmobiliaria registrada correctamente." });
    } catch (error: any) {
        res.status(400).json({ mensaje: error.message });
    }
};

export default registrarInmobiliaria;

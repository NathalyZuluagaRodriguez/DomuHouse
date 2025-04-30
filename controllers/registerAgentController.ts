import { Request, Response } from "express";
import usuarioServi from "../services/UserServices";
import Agent from "../Dto/AgentsDto";

const registerAgent = async (req: Request, res: Response) => {
  try {
    console.log("Datos recibidos:", req.body);

    const { nombre, email, telefono, password, inmobiliariaId, id_rol } = req.body;
    const agente = new Agent(nombre, email, telefono, password, inmobiliariaId, id_rol);
    const result = await usuarioServi.registerAgent(agente);

    return res.status(201).json({ message: "Agente registrado con éxito", agente: result });
  } catch (error: any) {
    console.error("Error registrando agente:", error);
    return res.status(500).json({ error: "Error al registrar agente" });
  }
};

export default registerAgent;
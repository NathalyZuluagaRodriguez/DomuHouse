import { Request, Response } from 'express'
import AgentService from '../services/agentServices'
import bcrypt from 'bcryptjs';


export const registerWithTokenController = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, telefono, password, token  } = req.body;

    // Validación de campos
    if (!nombre || !apellido || !email || !telefono || !password || !token) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios' 
      });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear objeto Agent con datos validados
    const agentData = {
      nombre,
      apellido,
      email,
      telefono,
      password: hashedPassword,
      token
    };

    const result = await AgentService.registerWithToken(agentData);
    res.status(201).json(result);
  } catch (err: any) {
    console.error('Error en registerWithTokenController:', err);
    res.status(400).json({ 
      error: err.message || 'Error al registrar agente con token' 
    });
  }
};

export const requestJoinController = async (req: Request, res: Response) => {
  try {
    const result = await AgentService.requestJoin(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const listRequestsController = async (_: Request, res: Response) => {
  const rows = await AgentService.listRequests();
  res.json(rows);
};

export const approveRequestController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await AgentService.approveRequest(id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const rejectRequestController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { justificacion } = req.body;
    const result = await AgentService.rejectRequest(id, justificacion);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const cancelRequestController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await AgentService.cancelRequest(id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

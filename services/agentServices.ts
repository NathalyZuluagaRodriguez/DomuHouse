import AgentTokenRepository from '../repositories/agentTokenRepository';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import Agent from '../Dto/AgentsDto';

export default class AgentService {
  // RF03.1
    static async registerWithToken(data: {
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    password: string,
    token: string
  }) {
    try {

      const correoDisponible = await UserRepository.verificarCorreoUnico(data.email);
        if (!correoDisponible) {
          throw new Error('El correo electrónico ya está registrado en el sistema');
        }
      // Validar token y obtener inmobiliaria
      const idInmobiliaria = await AgentTokenRepository.validateToken(data.token);
      if (!idInmobiliaria) {
        throw new Error('Token inválido o ya usado');
      }

      // Crear instancia de Agent con datos validados
      const agent = new Agent(
        data.nombre,
        data.apellido,
        data.email,
        data.telefono,
        data.password,
        idInmobiliaria
      );

      // Registrar agente
      await AgentTokenRepository.createAgentWithToken(
        agent.nombre,
        agent.apellido,
        agent.email,
        agent.telefono,
        agent.password,
        agent.id_inmobiliaria
      );

      // Marcar token como usado
      await AgentTokenRepository.markTokenUsed(data.token);

      return { 
        message: 'Agente registrado exitosamente',
        success: true,
        data: {
          nombre: agent.nombre,
          email: agent.email,
          id_inmobiliaria: agent.id_inmobiliaria
        }
      };
    } catch (error: any) {
      console.error("Error en AgentService.registerWithToken:", error);
      throw error;
    }
  }

  // RF03.2
  static async requestJoin(data: any) {
    const { nombre, apellido, correo, telefono, password, idInmobiliaria } = data;
    
    // Validar campos
    if (!nombre || !apellido || !correo || !telefono || !password || !idInmobiliaria) {
      throw new Error('Todos los campos son obligatorios');
    }
    
    const hash = await bcrypt.hash(password, 10);
    await UserRepository.insertSolicitud(nombre, apellido, correo, telefono, hash, idInmobiliaria);
    return { message: 'Solicitud enviada correctamente', success: true };
  }

  // RF03.3
  static async listRequests() {
    return await UserRepository.listSolicitudes();
  }

  static async approveRequest(id: number) {
    if (!id || isNaN(id)) {
      throw new Error('ID de solicitud inválido');
    }
    
    await UserRepository.approveSolicitud(id);
    return { message: 'Solicitud aprobada y agente registrado', success: true };
  }

  // RF03.4
  static async rejectRequest(id: number, justificacion?: string) {
    if (!id || isNaN(id)) {
      throw new Error('ID de solicitud inválido');
    }
    
    await UserRepository.rejectSolicitud(id, justificacion);
    return { message: 'Solicitud rechazada', success: true };
  }

  static async cancelRequest(id: number) {
    if (!id || isNaN(id)) {
      throw new Error('ID de solicitud inválido');
    }
    
    await UserRepository.cancelSolicitud(id);
    return { message: 'Solicitud cancelada', success: true };
  }
}

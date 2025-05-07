// services/usuarioServi.ts

import generateHash from '../Helpers/generateHash';
import UserRepository from '../repositories/UserRepository';


import User from '../Dto/UserDto';
import Login from '../Dto/loginDto';
import Agent from '../Dto/AgentsDto';


class usuarioServi {

    // Registro de usuario
    static async register(usuario: User) {
        try {
            // Encriptar la contraseña antes de guardar
            usuario.password = await generateHash(usuario.password);
            return await UserRepository.createUsuario(usuario);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw new Error('No se pudo registrar el usuario');
        }
    }

    // Login de usuario
    static async login(login: Login) {
        try {
            return await UserRepository.buscarUsuario(login);
        } catch (error) {
            console.error('Error al buscar usuario:', error);
            throw new Error('Credenciales incorrectas');
        }
    }

    // Registro de agente
    static async registerAgent(agent: Agent) {
        try {
          console.log("Agente recibido en servicio:", agent);
          agent.password = await generateHash(agent.password);
          return await UserRepository.createAgente(agent);
        } catch (error) {
          console.error('Error al registrar agente:', error);
          throw new Error('No se pudo registrar el agente');
        }
      }
      
}

export default usuarioServi;

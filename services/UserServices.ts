
import generateHash from '../Helpers/generateHash';
import UserRepository from '../repositories/UserRepository';

import User from '../Dto/UserDto';
import Login from '../Dto/loginDto';


class usuarioServi {
    
    static async register(usuario: User) {
        usuario.password = await generateHash(usuario.password);
        return await UserRepository.createUsuario(usuario);
    }

    static async login(login: Login) {
        return await UserRepository.buscarUsuario(login);
    }
}

export default usuarioServi;

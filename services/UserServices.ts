import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';
import  User  from '../Dto/UserDto';

export class UserServices {
  static async login(email: string, password: string): Promise<User | null> {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null; // Usuario no encontrado o contraseña incorrecta
    }
    return user;
  }

  static async register(user: User): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await UserRepository.create(new User(user.email, user.nombres, hashedPassword));
}
}

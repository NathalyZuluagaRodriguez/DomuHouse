import { pool } from '../config/config-db';
import  User  from '../Dto/UserDto';

export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    const [rows]: any = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows.length ? rows[0] : null;
  }

  static async create(user: User): Promise<void> {
    const { nombre, email, password } = user;
    await pool.query('INSERT INTO Users (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, password]);
  }
}

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/config-db';
import User from '../Dto/UserDto';

// Registrar usuario
export const register = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.execute(
      'INSERT INTO Users (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Iniciar sesión
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    console.log('Buscando usuario con email:', email);
    const [rows]: any = await pool.execute('SELECT * FROM Users WHERE email = ?', [email]);

    if (rows.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user: User = rows[0];

    console.log('Comparando contraseñas...');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    console.log('Login exitoso, enviando token');
    res.json({ message: 'Login exitoso', token });

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'El email es requerido' });
  }

  try {
    const [result]: any = await pool.execute('DELETE FROM Users WHERE email = ?', [email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  const { email, nombre, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'El email es requerido' });
  }

  try {
    // Encriptar la nueva contraseña si se proporciona
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Ejecutar la consulta SQL
    const [result]: any = await pool.execute(
      'UPDATE Users SET nombre = ?, password = ? WHERE email = ?',
      [nombre, hashedPassword, email]
    );

    // Verificar si el usuario fue actualizado
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

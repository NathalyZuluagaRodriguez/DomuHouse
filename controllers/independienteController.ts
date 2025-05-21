import { Request, Response } from 'express';
import generateToken from '../Helpers/generateToken';
import { transporter, MAIL_FROM } from '../config/config-mailer';
import usuarioServi from '../services/UserServices';
import generateHash from '../Helpers/generateHash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registrarIndependiente = async (req: Request, res: Response) => {
  try {
    const usuario = req.body;
    usuario.password = await generateHash(usuario.password);
    const creado = await usuarioServi.register(usuario);

    const token = generateToken({ email: usuario.email }, 10);

    return res.status(201).json({ mensaje: 'Usuario registrado', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const validarCorreoIndependiente = async (req: Request, res: Response) => {
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ error: 'Correo y token son requeridos' });
  }

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: 'Confirmación de Registro - DomuHouse',
      html: `<p>Haz clic en el siguiente enlace para confirmar tu registro:</p>
             <a href="http://localhost:10101/independiente/confirmar-registro?token=${token}">Confirmar Registro</a>`
    });

    return res.json({ mensaje: 'Correo de confirmación enviado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar el correo' });
  }
};

export const confirmarRegistroIndependiente = async (req: Request, res: Response) => {
  const token = req.body.token || req.query.token;

  if (!token) {
    return res.status(400).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as any;
    const email = decoded.data.email;

    return res.json({ mensaje: 'Token válido', correo: email });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

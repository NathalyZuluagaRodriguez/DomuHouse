import { Request, Response } from 'express';
import { validarFormatoCorreo } from '../utils/validarFormatoCorreo';
import promisePool from '../config/config-db';
import { transporter, MAIL_FROM } from '../config/config-mailer';

export const validarCorreo = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Correo es requerido' });
  }

  if (!validarFormatoCorreo(email)) {
    return res.status(400).json({ error: 'Formato de correo inválido' });
  }

  try {
    const [rows]: any = await promisePool.query('CALL sp_validar_correo(?)', [email]);
    if (rows[0].length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    await promisePool.query('CALL sp_guardar_codigo_verificacion(?, ?)', [email, codigo]);

    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${codigo}`
    });

    return res.json({ mensaje: 'Código enviado al correo' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const verificarCodigo = async (req: Request, res: Response) => {
  const { email, codigo } = req.body;

  if (!email || !codigo) {
    return res.status(400).json({ error: 'Correo y código son requeridos' });
  }

  try {
    const [rows]: any = await promisePool.query('CALL sp_verificar_codigo(?, ?)', [email, codigo]);
    const valido = rows[0].length > 0;

    if (!valido) {
      return res.status(400).json({ error: 'Código inválido o expirado' });
    }

    return res.json({ mensaje: 'Código verificado correctamente' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};



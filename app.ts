import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(express.json()); // ✅ Necesario para que el body funcione
app.use('/auth', authRoutes); // ✅ Carga las rutas correctamente

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

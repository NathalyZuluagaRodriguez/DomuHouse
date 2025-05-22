import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import register from './routes/register';
import login from './routes/login';
import authRoutes from './routes/auth';
import  logout  from './routes/logout';
import independienteRoutes from './routes/independiente';
import propiedadRoutes from './routes/propiedadRoutes';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth',register);
app.use('/auth',login);
app.use('/auth', authRoutes);
app.use('/auth',logout);
app.use('/independiente', independienteRoutes);
app.use('/api/admin', propiedadRoutes);


const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

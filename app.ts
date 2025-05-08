import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import register from './routes/register';
import login from './routes/login';
import authRoutes from './routes/auth';
import { logout } from './controllers/logoutController';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/',register);
app.use('/',login);
app.use('/auth', authRoutes);
app.use('/',logout);


const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

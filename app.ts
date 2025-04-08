import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import register from './routes/register';
import login from './routes/login';
import visit from './routes/visit';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/register',register);
app.use('/login',login);
app.use('/visit',visit)


const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

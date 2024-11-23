import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'; 
import adminRoutes from './routes/admin.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import cors from 'cors' 
 
dotenv.config();

mongoose
  .connect(process.env.MONGO, {
  })
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log('MongoDB Connection Error:', error));

const __dirname = path.resolve()
const app = express();


app.use(express.json())
app.use(cookieParser())
app.listen(2000, () => {
  console.log('Server starting on 2000 port');
});

app.use(cors())

app.use('/api/user', userRoutes);
app.use('/api/auth' , authRouter)
app.use('/api/admin' , adminRoutes)

app.use((err , req, res, next)=>{
  const statusCode  = err.statusCode || 500;
  const message = err.message || 'Internal server error'
  return res.status(statusCode).json({
    success : false,
    message,
    statusCode
  });
})

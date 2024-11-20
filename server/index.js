import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'; // Added `.js` extension

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json())
app.listen(2000, () => {
  console.log('Server starting on 2000 port');
});

app.use('/api/user', userRoutes);

app.use((err , req, res, next)=>{
  const statusCode  = err.statusCode || 500;
  const message = err.message || 'Internal server error'
  return res.status(statusCode).json({
    success : false,
    message,
    statusCode
  });
})

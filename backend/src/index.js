import app from './app';
import dotenv from 'dotenv';

dotenv.config();

app.start({ port: process.env.PORT }, () => {
  console.log('Server started successfuly');
});

import dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.start({ port: process.env.PORT }, () => {
  console.log('Server started successfuly');
});

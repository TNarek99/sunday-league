import dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

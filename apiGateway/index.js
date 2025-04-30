import express from 'express';
import dotenv from 'dotenv';
import checkJwt from './middlewares/checkJwt.js';

dotenv.config({ path: './apiGateway/.env.apiGateway' });

const app = express();
const port = process.env.PORTAPI;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡API Gateway en funcionamiento weeeeeeeb!');
});

app.get('/protegida', checkJwt, (req, res) => {
  res.send('¡Ruta protegida! Token válido.');
});

app.listen(port, () => {
  console.log(`Servidor API Gateway corriendo en el puerto ${port}`);
});

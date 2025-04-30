import express from 'express';
import dotenv from 'dotenv';
import jwksRsa from 'jwks-rsa';
import { expressjwt } from 'express-jwt';

dotenv.config(); // Carga el .env local

const app = express();
const port = process.env.PORT || 4000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware JWT con Auth0
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

// Ruta pública
app.get('/', (req, res) => {
  res.send('¡API Gateway en funcionamiento!');
});

// Ruta protegida
app.get('/protegida', checkJwt, (req, res) => {
  res.send('¡Ruta protegida! El token es válido.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor APIgateway - corriendo en el puerto ${port}`);
});

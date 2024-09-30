import express, { Request, Response, NextFunction } from 'express';
import filmsRouter from './routes/films';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Compteur pour les requêtes GET
let getRequestCount = 0;

// Middleware global pour enregistrer les statistiques
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.method === 'GET') {
    getRequestCount++;
    console.log(`GET counter: ${getRequestCount}`);
  }
  next();
});

// Routes pour les films
app.use('/films', filmsRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to myMovies API!');
});

export default app;

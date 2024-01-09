import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api-router';
import { handleFourOhFour } from './controllers/error-controller';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.all('*', handleFourOhFour);

export default app;
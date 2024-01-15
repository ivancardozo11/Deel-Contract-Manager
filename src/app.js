import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/v1/index.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/v1', routes);

app.use((req, res) => {
    res.status(404).send('This route doenst exist');
});

export default app;

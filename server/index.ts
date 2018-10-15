import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Routes } from './controllers';
import { DevController } from './controllers/dev.controller';

const app: express.Application = express();
app.use(morgan('dev'));
const port: number = Number(process.env.PORT) || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

mongoose.connect('mongodb://mongo', { useNewUrlParser: true })

app.use(bodyParser.json());
app.use('/dev', DevController);
app.use('/api', Routes);
app.use(express.static(path.resolve(process.cwd(), 'dist_client')));

app.use('*', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public', 'index.html'));
});

const server = new http.Server(app);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  server.listen(port, '0.0.0.0', () => console.log(`Server started at ${port}`));
});


export default app;

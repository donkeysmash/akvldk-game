import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as socketIO from 'socket.io';
import * as bodyParser from 'body-parser';
import { runSocketIO } from './gameLogic';
import { Routes } from './controllers';
import { DevController } from './controllers/dev.controller';

const app: express.Application = express();
app.use(morgan('dev'));
const port: number = Number(process.env.PORT) || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  mongoose.connect('mongodb://mongo', { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}

app.use(bodyParser.json());
app.use('/dev', DevController);
app.use('/api', Routes);
app.use(express.static(path.resolve(process.cwd(), 'dist_client')));

// TODO what is the proper uri in case of development
app.use('*', (req, res) => {
  console.log('fallback uri');
  res.sendFile(path.resolve(process.cwd(), 'client', 'index.html'));
});

const server = new http.Server(app);
export const io = socketIO(server);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  runSocketIO();
  server.listen(port, '0.0.0.0', () => console.log(`Server started at ${port}`));
});


export default app;

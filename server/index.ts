import * as express from 'express';
import * as path from 'path';
import  * as mongoose from 'mongoose';
import { SessionController, DevController } from './controllers';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

mongoose.connect('mongodb://mongo', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connection opened');
  if (isDevelopment) {
    app.use('/dev', DevController);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist_client')));
  }

  app.use('/session', SessionController);
  app.listen(port, '0.0.0.0', () => console.log(`Server started at ${port}`));
});


export default app;

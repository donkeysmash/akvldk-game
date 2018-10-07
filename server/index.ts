import * as express from 'express';
import { SessionController, DevController } from './controllers';
import * as path from 'path';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';


if (isDevelopment) {
  app.use('/dev', DevController);
} else {
  app.use(express.static(path.resolve(process.cwd(), 'dist_client')));
}

app.use('/session', SessionController);



app.listen(port, '0.0.0.0', () => console.log(`Server started at ${port}`));

export default app;
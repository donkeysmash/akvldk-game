import * as express from 'express';
import { SessionController } from './controllers';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, '0.0.0.0');


// Session starts when the host initiate it

app.use('/session', SessionController);

export default app;
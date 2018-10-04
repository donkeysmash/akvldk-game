import * as express from 'express';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 8080;

app.listen(port, '0.0.0.0', () => {
  console.log('apsodjpaofsj');
});

app.get(['*'], () => {
  console.log("hello world");
})

export default app;
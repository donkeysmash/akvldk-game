import { Router, Request, Response } from 'express';
import { Session } from '../models/session';


const router: Router = Router();


router.get('/clean', async (req: Request, res: Response) => {

});

router.get('/init', async (req: Request, res: Response) => {
  const defaultSession = new Session({ name: 'default_session' });
  const result = await defaultSession.save();
  res.send(result);
});

export const DevController: Router = router;

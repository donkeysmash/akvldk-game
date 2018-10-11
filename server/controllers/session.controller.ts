import { Router, Request, Response } from 'express';
import { Session } from '../models';
import { io } from '../';


const router: Router = Router();


router.get('/', async (req: Request, res: Response) => {
  const sessions = await Session.find({});
  res.json(sessions);
});


export const SessionController: Router = router;

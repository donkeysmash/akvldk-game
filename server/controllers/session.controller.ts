import { Router, Request, Response } from 'express';
import { Session } from '../models';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  const sessions = await Session.find({});
  res.json({ data: { sessions }});
});

export const SessionController: Router = router;

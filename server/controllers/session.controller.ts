import { Router, Request, Response } from 'express';
import { Session, User } from '../models';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, hostId } = req.body;
    const host = await User.findById(hostId);
    if (!host) {
      return res.status(404).json({ message: `User$${hostId} is not found. Valid user required for host` });
    }
    const session = new Session({ name, host });
    await session.save();
    return res.json({ data: { session }});
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send(err);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find({});
    res.json({ data: { sessions }});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get('/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId);
    return res.status(200).json({ data: { session }});
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

export const SessionController: Router = router;

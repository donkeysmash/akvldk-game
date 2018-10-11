import { Router, Request, Response } from 'express';
import { User } from '../models';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { displayName } = req.body;
    if (await User.count({ displayName }) > 0) {
      res.status(403);
      return res.json({ message: `displayName$${displayName} already exists`});
    }
    const user = await (new User({ displayName })).save();
    res.status(201);
    return res.json({ data: { user }});
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send(err);
  }
});

router.get('/', async (req: Request, res: Response,) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400);
      return res.json({ message: 'must query by id' });
    }

    const user = await User.findById(id);
    if (user) {
      res.status(200);
      return res.json({ data: { user }});
    }
    res.status(404);
    return res.json({ message: `user$${id} not found` });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send(err);
  }
});

export const UserController: Router = router;
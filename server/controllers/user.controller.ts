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
    const { id, displayName } = req.query;
    if (!id && !displayName) {
      res.status(400);
      return res.json({ message: 'must query by id or displayName' });
    }

    let user;
    if (id) {
      user = await User.findById(id);
    } else if (displayName) {
      user = await User.findOne({ displayName });
    }

    if (user) {
      res.status(200);
      return res.json({ data: { user }});
    }

    // temp code until the actual registering page
    res.status(201);
    if (displayName) {
      user = new User({ displayName });
      await user.save();
      return res.json({ data: { user }});
    }
    // temp end



    res.status(404);
    return res.json({ message: `user$${id || displayName} not found` });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.send(err);
  }
});

export const UserController: Router = router;
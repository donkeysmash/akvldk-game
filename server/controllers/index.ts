import { Router } from 'express';
import { SessionController } from './session.controller';
import { UserController } from './user.controller';

const router: Router = Router();

router.use('/user', UserController);
router.use('/session', SessionController);

export const Routes = router;

export { SessionController } from './session.controller';
export * from './dev.controller';

import { Router, Request, Response } from 'express';
import { SessionController } from './session.controller';

const router: Router = Router();

router.use('/session', SessionController);

export const Routes = router;

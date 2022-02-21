import { Router } from 'express';
import { userController } from 'src/module/user/user.controller';
import { auth } from 'kernell-smartinfo';
const router: Router = Router();
router.post('/',[auth.validateTokenRoute],userController.validateUser);
router.post('/validate',userController.validateUser);
router.post('/change-password',userController.changePassword);
export default router;
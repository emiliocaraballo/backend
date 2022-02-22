import { Router } from 'express';
import { userController } from 'src/modules/user/user.controller';
const router: Router = Router();
router.post('/validate',userController.validateUser);
router.post('/change-password',userController.changePassword);
export default router;
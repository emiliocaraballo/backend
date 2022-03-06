import { Router } from 'express';
const router: Router = Router();
// controlador
import { userController } from 'src/modules/user/user.controller';

// validaciones
import { ValideUserJoi,LoginJoi,ActivePassJoi,CreateUserJoi } from 'src/modules/user/user.joi';
import {createValidator} from 'express-joi-validation';
import { auth } from 'src/middleware/auth';

const validator =createValidator({
    passError:true
});

// importar funcione de controladores con su validaciones joi,
router.post('/validate',[validator.body(ValideUserJoi)],[userController.validateUser]);
router.post('/login',[validator.body(LoginJoi)],[userController.login]);
router.post('/change-password',[validator.body(ValideUserJoi)],[userController.changePassword]);
router.post('/active-password',[auth.validateTokenRoute,validator.body(ActivePassJoi)],[userController.activePassword]);
router.post('/create',[auth.validateTokenRoute,validator.body(CreateUserJoi)],[userController.create]);
router.put('/:sequence',[auth.validateTokenRoute,validator.body(CreateUserJoi)],[userController.update]);
export default router;
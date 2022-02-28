import { Router } from 'express';
const router: Router = Router();
// controlador
import { userController } from 'src/modules/user/user.controller';

// validaciones
import { ValideUserJoi,LoginJoi } from 'src/modules/user/user.joi';
import {createValidator} from 'express-joi-validation';

const validator =createValidator({
    passError:true
});

// importar funcione de controladores con su validaciones joi,
router.post('/validate',[validator.body(ValideUserJoi)],[userController.validateUser]);
router.post('/login',[validator.body(LoginJoi)],[userController.login]);
router.post('/change-password',[validator.body(ValideUserJoi)],[userController.changePassword]);
export default router;
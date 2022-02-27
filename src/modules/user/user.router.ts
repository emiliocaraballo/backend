import { Router } from 'express';
const router: Router = Router();
// controlador
import { userController } from 'src/modules/user/user.controller';

// validaciones
import { ValideUser } from 'src/modules/user/user.joi';
import {createValidator} from 'express-joi-validation';

const validator =createValidator({
    passError:true
});

// importar funcione de controladores con su validaciones joi,
router.post('/validate',[validator.body(ValideUser)],[userController.validateUser]);
router.post('/change-password',[validator.body(ValideUser)],[userController.changePassword]);

export default router;
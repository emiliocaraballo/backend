import { Router } from 'express';
const router: Router = Router();
// controlador
import { userController } from 'src/modules/user/user.controller';

// validaciones
import { ValideUserJoi } from 'src/modules/user/user.joi';
import {createValidator} from 'express-joi-validation';
import { auth } from 'src/middleware/auth';

const validator =createValidator({
    passError:true
});

// importar funcione de controladores con su validaciones joi,
router.post('/create',[validator.body(ValideUserJoi)],[userController.validateUser]);
export default router;
import { Router } from 'express';
const router: Router = Router();
// controlador
import { menuController } from 'src/modules/menu/menu.controller';

// validaciones
import {createValidator} from 'express-joi-validation';
import { auth } from 'src/middleware/auth';
import { GetParamPadreMenuJoi, MenuCreateJoi } from 'src/modules/menu/menu.joi'

const validator =createValidator({
    passError:true
});

// importar funcione de controladores con su validaciones joi,
router.post('/create',[auth.validateTokenRoute,validator.body(MenuCreateJoi)],[menuController.create]);
router.get('/:sequence',[auth.validateTokenRoute,validator.params(GetParamPadreMenuJoi)],[menuController.findMenuParent]);
export default router;
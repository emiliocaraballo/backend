import { Router } from 'express';
const router: Router = Router();
// controlador
import { profileController } from 'src/modules/profile/profile.controller';

// validaciones
import {createValidator} from 'express-joi-validation';
import { auth } from 'src/middleware/auth';
import { ProfileCreateJoi,ProfileUpdateJoi,GetParamProfileJoi}  from 'src/modules/profile/profile.joi'

const validator =createValidator({
    passError:true
});

// importar funcione de controladores con su validaciones joi,
router.post('/create',[auth.validateTokenRoute,validator.body(ProfileCreateJoi)],[profileController.create]);
router.put('/:sequence',[auth.validateTokenRoute,validator.params(GetParamProfileJoi),validator.body(ProfileUpdateJoi)],[profileController.update]);
export default router;
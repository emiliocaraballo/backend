import { NextFunction, Request, Response } from 'express';
import { profileRepository  } from 'src/modules/profile/profile.repository';
import { to } from 'await-to-js';
import { customError } from 'src/middleware/customError';

class ProfileController {

    public create= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  
        const [error, result] = await to(
            profileRepository.create(req.body)
        );
        // si la respuesta no es exitosa. 
        if (result.statusCode!=201) {
           return customError.Error(req,res,result.statusCode,result.message);
        }
        // respuestado
        res.status(result.statusCode).json({
            success:true,
            message:""
        });
    }

    public update= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  
        var sequence:number=parseInt(req.params.sequence); 
        const [error, result] = await to(
            profileRepository.update(req.body,sequence)
        );
        // si la respuesta no es exitosa. 
        if (result.statusCode!=201) {
           return customError.Error(req,res,result.statusCode,result.message);
        }
        // respuestado
        res.status(result.statusCode).json({
            success:true,
            message:""
        });
    }

}
export const profileController = new ProfileController;
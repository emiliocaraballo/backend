import { NextFunction, Request, Response } from 'express';
import { IUser } from "src/interfaces/user";
import { userRepository} from 'src/modules/user/user.repository';
import { to } from 'await-to-js';
import { customError } from 'src/middleware/customError';

class UserController {

    public validateUser= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  
        const [error, result] = await to(
         userRepository.validateUser(req.body.username)
        );
         
        // si la respuesta no es exitosa. 
        if (result.statusCode!=200) {
           return customError.Error(req,res,result.statusCode,result.message)
        }
        
        // respuestado
        res.status(result.statusCode).json({
            success:true
        });    
    }

    
    public login= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        const [error, result] = await to(
         userRepository.login(req.body)
        )
        // si la respuesta no es exitosa. 
        if (result.statusCode!=200) {
           return customError.Error(req,res,result.statusCode,result.message)
        }
        
        // respuestado
        res.status(result.statusCode).json({
            token:result.token,
            data:result.data
        });
    }

    public changePassword= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        const { username }: IUser = req.body;
        
        // logica
        const [error, result] = await to(
         userRepository.changePassword(username)
        ); 
        // si la respuesta no es exitosa. 
        if (result.statusCode!=200 && result.statusCode!=201) {
           return customError.Error(req,res,result.statusCode,result.message)
        }

        // respuestado
        res.status(result.statusCode).json({
            success:true
        });    
    }
}
export const userController = new UserController;
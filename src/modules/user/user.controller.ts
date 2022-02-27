import { NextFunction, Request, Response } from 'express';
import { IUser } from "src/modules/user/user.inferface";
import { userRepository} from 'src/modules/user/user.repository';
import { to } from 'await-to-js';
import { customError } from 'src/middleware/customError';
import { Get, Route } from "tsoa";

class UserController {

    public validateUser= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        const { username }: IUser = req.body;
        
        // logica
        const [error, result] = await to(
         userRepository.validateUser(username)
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
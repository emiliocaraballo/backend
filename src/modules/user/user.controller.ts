import { NextFunction, Request, Response } from 'express';
import { userRepository} from 'src/modules/user/user.repository';
import { to } from 'await-to-js';
import { customError } from 'src/middleware/customError';

class UserController {

    public validateUser= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  
        const [error, result] = await to(
         userRepository.validateUser(req.body.username)
        );
        // si la respuesta no es exitosa. 
        if (error) {
           return customError.Error(req,res,error.name,error.message)
        }
        // respuestado
        res.status(200).json({
            success:true,
            message:""
        });
    }

    public login= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
        const [error, result] = await to(
         userRepository.login(req.body)
        )
        // si la respuesta no es exitosa. 
         if (error) {
            return customError.Error(req,res,error.name,error.message)
         }
        // respuestado
        res.status(200).json({
            token:result.token,
            data:result.data
        });
    }

    public changePassword= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    
        const [error, result] = await to(
         userRepository.changePassword(req.body.username)
        ); 
        // si la respuesta no es exitosa. 
        if (error) {
            return customError.Error(req,res,error.name,error.message)
        }     
        // respuestado
        res.status(201).json({
            success:true,
            message:result.message
        });    
    }

    public activePassword= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    
       
        const [error, result] = await to(
         userRepository.activePassword(req.body.password,req.body.users.data)
        ); 
       
        // si la respuesta no es exitosa. 
        if (error) {
            return customError.Error(req,res,error.name,error.message)
        }

        // respuestado
        res.status(201).json({
            success:true,
            message:result.message
        });    
    }

    public create= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    
       
        const [error, result] = await to(
         userRepository.create(req.body,req.body.users.data)
        ); 
       
        // si la respuesta no es exitosa. 
        if (error) {
            return customError.Error(req,res,error.name,error.message)
         }
        

        // respuestado
        res.status(201).json({
            success:true,
            message:result.message
        });    
    }

    public update= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    
       
        const [error, result] = await to(
         userRepository.update(req.body,req.body.users.data)
        ); 
       
        // si la respuesta no es exitosa. 
        if (error) {
            return customError.Error(req,res,error.name,error.message)
        }
        

        // respuestado
        res.status(201).json({
            success:true,
            message:result.message
        });    
    }
    
    
}
export const userController = new UserController;
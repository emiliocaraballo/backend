import { NextFunction, Request, Response } from 'express';
import { menuRepository  } from 'src/modules/menu/menu.repository';
import { to } from 'await-to-js';
import { customError } from 'src/middleware/customError';

class MenuController {

    public create= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  
        const [error, result] = await to(
            menuRepository.create(req.body)
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

    public findMenuParent= async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  
        var sequence:number=parseInt(req.params.sequence);
        const [error, result] = await to(
            menuRepository.findMenuParent(sequence)
        );
        // si la respuesta no es exitosa. 
        if (result.statusCode!=200) {
           return customError.Error(req,res,result.statusCode,result.message);
        }
        // respuestado
        res.status(result.statusCode).json({
            data:result.data
        });
    }

   
}
export const menuController = new MenuController;
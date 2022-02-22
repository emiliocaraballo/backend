import { Request, Response } from 'express';
import { validateForm,extra } from 'kernell-smartinfo'
import { IUser } from "src/modules/user/user.inferface";
import { userRepository} from 'src/modules/user/user.repository';

class UserController {

    public validateUser= async (req: Request, res: Response): Promise<void> => {
        const { username }: IUser = req.body;

        /* validar el campo de entrada de username */
        const validateUsername=validateForm("mail",username,2,255);
        if(!validateUsername.status){
           
            if(validateUsername.code==2){
                 // codigo 2 es cuando no cumple con lo caracteres minimo.
                extra.Error(req,res,400,"El dato de usuario esta vacio.");
            }else  if(validateUsername.code==3){
                 // codigo 2 es cuando no cumple con lo caracteres maximo.
                extra.Error(req,res,400,"Maximo son 255 caracteres verifique el usuario.");
            }else if(validateUsername.code==1){
                // no cumple con lo requisito de la expresion regular.
                extra.Error(req,res,400,"Formato de correo invalido.");
            }
        }
        /*end:validar el campo de entrada de username */
        const result=await userRepository.validateUser(username);
        if(result.ok){
            res.status(200).json({
                code:1
            }); 
        }
        extra.Error(req,res,404,"El usuario no existe.");
    }


    public changePassword= async (req: Request, res: Response): Promise<void> => {
        const { username }: IUser = req.body;

         /* validar el campo de entrada de username */
         const validateUsername=validateForm("mail",username,1,255);
         if(!validateUsername.status){
            
             if(validateUsername.code==2){
                  // codigo 2 es cuando no cumple con lo caracteres minimo.
                 extra.Error(req,res,400,"El dato de usuario esta vacio.");
             }else  if(validateUsername.code==3){
                  // codigo 2 es cuando no cumple con lo caracteres maximo.
                 extra.Error(req,res,400,"Maximo son 255 caracteres verifique el usuario.");
             }else if(validateUsername.code==1){
                 // no cumple con lo requisito de la expresion regular.
                 extra.Error(req,res,400,"Formato de correo invalido.");
             }
         }
         /*end:validar el campo de entrada de username */

         const result=await userRepository.validateUser(username);
         if(result.ok){
             // historial de clave que dure 30M y si no encuentra registro genere uno nuevo.

            // res.status(200).json({
            //     code:1
            // }); 

         }

         extra.Error(req,res,404,"El usuario no existe.");
    }
}
export const userController = new UserController;
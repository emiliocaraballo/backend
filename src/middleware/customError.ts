import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { MessageError } from 'src/database/entity/messageErrors';
import { to } from 'await-to-js';

class CustomError{
    public Error=async(req:Request,res:Response,status:number,code:string)=>{
        const Query=getRepository(MessageError).findOne({select:["title","description"],where:{code:code,status:1}});
        const [errorResponse, response] = await to(Query);

        var title="Lo sentimos.";
        var description="Tenemos inconveniente intente mas tarde.";
        
        if(response){
            title=response.title;
            description=response.description;
        } 
        
        res.status(status || 500).json({
            statusCode:status,
            title:title,
            message:description,
            timestamp: new Date().toISOString(),
            path:req.baseUrl
        });
        return;
    }
}
export const customError = new CustomError;
import * as dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
import { customError } from "./customError";
class Auth{
    public generateToken=async(data:any,time:number=0)=>{
        return jwt.sign({
            data
        },
            process.env.JWT_SECRET+'',
            {
                expiresIn: time>0?time+'m':process.env.JWT_DURATION
            }
        );
    }
  
    public validateToken=async(token:string)=>{
        try {
            return jwt.verify(token, process.env.JWT_SECRET  + '', async (err) => {
                if (err) return false;  
    
                return true;
            });
            
        } catch (error) {
            
        }
        return false; 
    }

    public validateTokenRoute=async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const token: string=req.headers.authorization + '';
           
            
            if(token!="undefined"){
                return jwt.verify(token, process.env.JWT_SECRET  + '', async (err) => {
                    if (err) return customError.Error(req,res,401,"AUTHORIZATION_INVALID");
                    const datatoken = jwt_decode(token);
                    req.body.users=datatoken;
                    next();
                });
            }
        } catch (error) {
            
        }
      return customError.Error(req,res,401,"AUTHORIZATION_FOUND")
    }
}
export const auth = new Auth;
import * as dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { NextFunction, Request, Response } from 'express';
class Auth{
    public generateToken=async(data:any)=>{
        return jwt.sign({
            data
        },
            process.env.JWT_SECRET+'',
            {
                expiresIn: process.env.JWT_DURATION
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
            const token: string = req.headers.authorization + '';
            return jwt.verify(token, process.env.JWT_SECRET  + '', async (err) => {
                if (err) return res.status(401).json({
                    code: -2,
                    message: 'Token Invalido'
                });     
    
            const datatoken = jwt_decode(token);
            req.body.users=datatoken;
            next();
        });
            
        } catch (error) {
            
        }
        const dataResponde={
            code:"UNEXPECTED_ERROR",
            description:"Ha ocurrido un error inesperado",
            statusCode:401,
            title:"Lo sentimos",
            path:"ruta"
        }
        res.status(401).json(dataResponde)
    }
}
export const auth = new Auth;
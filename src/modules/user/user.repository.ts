import { getRepository } from 'typeorm';
import { to } from 'await-to-js';
import bcrypt from 'bcryptjs';

import { IQueryResponse } from 'src/interfaces/repository'
import { UserAdmin } from 'src/database/entity/userAdmin'
import { IUser } from "src/interfaces/user";
import { auth } from 'src/middleware/auth';

class UserRepository{

    public validateUser=async (user: string): Promise<IQueryResponse> => {
        const Query=getRepository(UserAdmin).findOne({select:["email","identification","names","phone","id"],where:{email:user.toLocaleLowerCase()}});
        
        const [errorResponse, response] = await to(Query);
        
        if (!response) {
            return {
                statusCode:404,
                message:'USER_NOT_FOUND'
            }
        }

        return {
            statusCode:200,
            data:response
        }
    }

    public login=async (data: IUser): Promise<IQueryResponse> => {

        const Query=getRepository(UserAdmin).findOne({select:["email","identification","names","phone","id","password"],where:{email:data.username.toLocaleLowerCase()}});
      

        const [errorResponse, response] = await to(Query);
        if (!response) {
            return {
                statusCode:400,
                message:'USER_PASSWORD_VERIFY'
            }
        }

        if(!await this.checkPassword(data.password,response.password)){
            return {
                statusCode:400,
                message:'USER_PASSWORD_VERIFY'
            }
        }

        const user={
            id:response.id,
            names:response.names,
            phone:response.phone,
            identification:response.identification,
            email:response.email,
        }

       const token=await auth.generateToken(user)

        return {
            statusCode:200,
            token:token,
            data:user
        }
    }
    
    public changePassword=async (user: string): Promise<IQueryResponse> => {

        const [errorResponse, response] = await to(this.validateUser(user));
        if (!response) {
            return {
                statusCode:404,
                message:'USER_NOT_FOUND'
            }
        }

        // enviar la solicitud

        return {
            statusCode:200,
            data:response
        }
    }



    public checkPassword=async (password:string,passwordHash:string): Promise<boolean> => {
        return bcrypt.compare(password,passwordHash);
    }

}
export const userRepository=new UserRepository;
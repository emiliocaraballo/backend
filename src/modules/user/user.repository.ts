import { IQueryResponse } from 'src/interfaces/repository'
import { UserAdmin } from 'src/database/entity/userAdmin'
import { getRepository } from 'typeorm';
import { to } from 'await-to-js';

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

}
export const userRepository=new UserRepository;
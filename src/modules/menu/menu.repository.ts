import { getRepository } from 'typeorm';
import { to } from 'await-to-js';
import bcrypt from 'bcryptjs';

import { IQueryResponse } from 'src/interfaces/repository';
import { Menu } from 'src/database/entity/menu';
import { general } from 'src/config/general';

class UserRepository{

    public createMenu=async (user: string): Promise<IQueryResponse> => {

        var data={
            name:"",
            description:"",
            order:"",
            status:"",
            url:"",
            parentid:"",
        }

        const Query=getRepository(Menu).create(
            {
                id:"1",
                sequence:1,
                name:data.name,
                description:data.description,
                order:data.order,
                status:data.status,
                url:data.url,
                parentid:data.parentid,
                createdAt:general.dateNow(),
                updatedAt:general.dateNow(),
                userCreated:1,
                userUpdated:1
            }
        );
        
        // const [errorResponse, response] = await to(Query);
        // if (!response) {
        //     return {
        //         statusCode:404,
        //         message:'USER_NOT_FOUND'
        //     }
        // }

        return {
            statusCode:200,
            data:{}
        }
    }
}
export const userRepository=new UserRepository;
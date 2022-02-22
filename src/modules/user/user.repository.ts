import { IQueryResponse } from 'kernell-smartinfo/dist/src/lib/interface'
import {  UserAdmin } from 'src/database/entity/userAdmin'
import { getRepository } from 'typeorm';

class UserRepository{

    public validateUser=async (user: string): Promise<IQueryResponse> => {
        try {
            const userRepo=await getRepository(UserAdmin).findOne({select:["email","identification","names","phone","id"],where:{email:user.toLocaleLowerCase()}});
            return {
                ok: userRepo.id.length>0,
                data: userRepo
            }
        } catch (error) {
            
        }
        return {
            ok:false
        }
    }

}

export const userRepository=new UserRepository;
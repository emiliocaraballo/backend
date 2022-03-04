import { IQueryResponse } from 'src/interfaces/repository';
import { IProfile } from 'src/interfaces/profile';
import { getRepository } from 'typeorm';
import { general } from 'src/config/general';
import to from 'await-to-js';
import { Profile } from 'src/database/entity/profile';
class ProfileRepository{

    public create=async (menu: IProfile): Promise<IQueryResponse> => {

       const Query= getRepository(Profile).save(
           {
               createdAt: general.dateNow(),
               updatedAt: general.dateNow(),
               name: menu.name,
               description: menu.description,
               status: menu.status,
               icon: menu.icon,
               userCreated: menu.users.data.sequence,
               userUpdated: menu.users.data.sequence
           }
       );

       const [error,result]= await to(Query);
       if(!result){
            return {
                statusCode:404,
                message:"NOT_REQUEST"
            }
       }

        return {
            statusCode:201
        }
    }

    public update=async (menu: IProfile,sequence:number): Promise<IQueryResponse> => {

        const QueryFind= await getRepository(Profile).findOne(sequence,{
            select:["sequence"]
        })

        if(!QueryFind){
            return {
                statusCode:404,
                message:"MENU_NOT_FOUND"
            }
        }
        

        const Query= getRepository(Profile).update(
            sequence,
            {
                updatedAt: general.dateNow(),
                name: menu.name,
                description: menu.description,
                status: menu.status,
                icon: menu.icon,
                userUpdated: menu.users.data.sequence
            }
        );
 
        const [error,result]= await to(Query);

        
        if(error || result.affected==0){
             return {
                 statusCode:404,
                 message:"NOT_REQUEST"
             }
        }
 
         return {
             statusCode:201
         }
    }
}
export const profileRepository=new ProfileRepository;
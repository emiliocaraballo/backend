import { IQueryResponse } from 'src/interfaces/repository';
import { IProfile } from 'src/interfaces/profile';
import { getRepository } from 'typeorm';
import { general } from 'src/config/general';
import to from 'await-to-js';
import { Profile } from 'src/database/entity/profile';
import { MenuHasProfile } from 'src/database/entity/menusHasProfile';
import {getConnection} from "typeorm";
class ProfileRepository{

    public create=async (menu: IProfile): Promise<IQueryResponse> => {

        // transacion

        
        // get a connection and create a new query runner 
        const connection = getConnection(); const queryRunner = connection.createQueryRunner(); 
        // establish real database connection using our new query runner
        await queryRunner.connect();
        // lets now open a new transaction:
        await queryRunner.startTransaction();

        const profile=new Profile();
        profile.createdAt=general.dateNow();
        profile.updatedAt=general.dateNow();
        profile.name=menu.name;
        profile.description=menu.description;
        profile.status=menu.status;
        profile.icon=menu.icon;
        profile.userCreated=menu.users.data.sequence;
        profile.userUpdated=menu.users.data.sequence;

        const [errorProfile,responseProfile]=await to(queryRunner.manager.save(profile));
        console.log(errorProfile,responseProfile.sequence,"responseProfile");
        if(!responseProfile){
            return {
                statusCode:404,
                message:"NOT_REQUEST"
            }
       }
        

        try {
            
            

           
           

            // commit transaction now:
            await queryRunner.commitTransaction();

        } catch (error) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction();
        }finally {
    
            // you need to release query runner which is manually created:
            await queryRunner.release();
        }

      
       
       // end:transacion

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
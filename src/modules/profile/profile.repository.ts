import { IQueryResponse } from 'src/interfaces/repository';
import { IProfile } from 'src/interfaces/profile';
import { getRepository } from 'typeorm';
import { general } from 'src/config/general';
import to from 'await-to-js';
import { Profile } from 'src/database/entity/profile';
import { MenuHasProfile } from 'src/database/entity/menusHasProfile';
import { getConnection } from "typeorm";
import { Menu } from 'src/database/entity/menu';
class ProfileRepository {

    public create = async (menu: IProfile): Promise<IQueryResponse> => {
        // get a connection and create a new query runner 
        const connection = getConnection(); const queryRunner = connection.createQueryRunner();
        // establish real database connection using our new query runner
        await queryRunner.connect();
        // lets now open a new transaction:
        await queryRunner.startTransaction();

        const profile = new Profile();
        profile.createdAt = general.dateNow();
        profile.updatedAt = general.dateNow();
        profile.name = menu.name;
        profile.description = menu.description;
        profile.status = menu.status;
        profile.icon = menu.icon;
        profile.userCreated = menu.users.data.sequence;
        profile.userUpdated = menu.users.data.sequence;
        const [errorProfile, responseProfile] = await to(queryRunner.manager.save(profile));
        if (!responseProfile) {
            await queryRunner.rollbackTransaction();
            return {
                statusCode: 404,
                message: "NOT_REQUEST"
            }
        }

        var statusError = false;
        const result = await Promise.all(menu.menu.map(async (item) => {
            // ver si existe el menu
            const menuItem = await queryRunner.manager.findOne(Menu, {
                where: {
                    sequence: item.sequence
                }
            });
            if (!menuItem) {
                statusError = true;
                await queryRunner.rollbackTransaction();
                return statusError;
            }
            const menuHasProfile = new MenuHasProfile();
            menuHasProfile.createdAt = general.dateNow();
            menuHasProfile.updatedAt = general.dateNow();
            menuHasProfile.menusSequence = menuItem;
            menuHasProfile.profilesSequence = responseProfile;
            menuHasProfile.status = 1;
            menuHasProfile.userCreated = menu.users.data.sequence;
            menuHasProfile.userUpdated = menu.users.data.sequence;
            const [errorMenuHasProfile, responseMenuHasProfile] = await to(queryRunner.manager.save(menuHasProfile));
            if (!responseMenuHasProfile) {
                await queryRunner.rollbackTransaction();
                statusError = true;
                return statusError;
            }
        }));

        if (result[0] == true) {
            return {
                statusCode: 404,
                message: "NOT_REQUEST"
            }
        }

        // commit transaction now:
        await queryRunner.commitTransaction();

        return {
            statusCode: 201
        }
    }

    public update = async (menu: IProfile, sequence: number): Promise<IQueryResponse> => {

        var statusError = false;
        const QueryFind = await getRepository(Profile).findOne(sequence, {
            select: ["sequence"]
        })
        if (!QueryFind) {
            return {
                statusCode: 404,
                message: "PROFILE_NOT_FOUND"
            }
        }

        // get a connection and create a new query runner 
        const connection = getConnection(); const queryRunner = connection.createQueryRunner();
        // establish real database connection using our new query runner
        await queryRunner.connect();
        // lets now open a new transaction:
        await queryRunner.startTransaction();

        const profile = new Profile();
        profile.sequence = sequence;
        profile.createdAt = general.dateNow();
        profile.updatedAt = general.dateNow();
        profile.name = menu.name;
        profile.description = menu.description;
        profile.status = menu.status;
        profile.icon = menu.icon;
        profile.userCreated = menu.users.data.sequence;
        profile.userUpdated = menu.users.data.sequence;
        const [errorProfile, responseProfile] = await to(queryRunner.manager.save(profile));

        if (!responseProfile) {
            await queryRunner.rollbackTransaction();
           
            return {
                statusCode: 404,
                message: "NOT_REQUEST"
            }
        }

         const result = await Promise.all(menu.menu.map(async (item) => {

          const [errorMenu,verifyMenu]=await to(queryRunner.manager.findOne(Menu,{
                where:{
                    sequence:item.sequence
                },
                select:["sequence"]
          }));

          if(!verifyMenu){
            await queryRunner.rollbackTransaction();
            statusError = true;
            
            return statusError;
          }

         
          


        //   const verify=await queryRunner.manager.findOne(MenuHasProfile,{
        //         where:{
        //             profilesSequence:profile.sequence,
        //             menusSequence:item.sequence
        //         },
        //         select:["sequence"]
        //   });

       

        //   if(!verify){
        //     // actualizar
        //   }else{
        //     // ingresar
        //   }
          
                // console.log(item.sequence);
                




         }));
         console.log(result[0] == true);
         console.log(result);
         
         if (result[0] == true) {
            return {
                statusCode: 404,
                message: "NOT_REQUEST"
            }
        }

        console.log(result);
        // commit transaction now:
        await queryRunner.commitTransaction();
        return {
            statusCode: 201
        }
    }
}
export const profileRepository = new ProfileRepository;
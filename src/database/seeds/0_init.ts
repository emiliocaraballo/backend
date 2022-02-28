import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

 import { UserAdmin } from 'src/database/entity/userAdmin';
 import  { Profile } from  'src/database/entity/profile'
 import  { MessageError } from  'src/database/entity/messageErrors'

export default class CreateUser implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager(); 

        /**
          se crear el perfil para luego poder crear los usuarios 
        **/

        const profile = new Profile();
        profile.name="Super Administrador";
        profile.status=1;
        profile.description="";
        profile.icon="";
        profile.user_created=1;
        profile.created_at=Date();
        await em.save(profile);

        const profileRepository=await connection.getRepository(Profile).findOne({sequence:1});
        
        const user = new UserAdmin();
        user.names="Emilio Fernando Caraballo Dueñas";
        user.phone="3042334893";
        user.email="emiliocaraballo9810@gmail.com";
        user.role=1;
        user.status=1;
        user.identification="1001972281";
        user.profileSequence=profileRepository;
        user.created_at=Date();
        user.user_created=1;
        user.password="$2b$10$AYPtKNuAQsEO8C0hKO0Bg.qZAkUxL2EcQDnvEz4r16eWxhsRGbZzC";
        return await em.save(user)

    }
  }
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import  { MessageError } from  'src/database/entity/messageErrors'

export default class CreateMessage implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager(); 

        const messageError=new MessageError();
        messageError.code="USER_NOT_FOUND";
        messageError.description="El usuario no se encuentra registrado.";
        messageError.title="Lo sentimos.";
        messageError.created_at=Date();
        messageError.user_created=1; 
        messageError.status=1;
        await em.save(messageError);

        const messageError2=new MessageError();
        messageError2.code="USER_PASSWORD_VERIFY";
        messageError2.description="El nombre de usuario o contraseña son incorrectos.";
        messageError2.title="Lo sentimos.";
        messageError2.created_at=Date();
        messageError2.user_created=1; 
        messageError2.status=1;
        await em.save(messageError2)
      
        const messageError3=new MessageError();
        messageError3.code="AUTHORIZATION_FOUND";
        messageError3.description="No esta autenticado.";
        messageError3.title="Lo sentimos no tiene los permiso requerido.";
        messageError3.created_at=Date();
        messageError3.user_created=1; 
        messageError3.status=1;
        await em.save(messageError3);

        const messageError4=new MessageError();
        messageError4.code="AUTHORIZATION_INVALID";
        messageError4.description="Su Auth ha expirado.";
        messageError4.title="Lo sentimos.";
        messageError4.created_at=Date();
        messageError4.user_created=1; 
        messageError4.status=1;
       
        return await em.save(messageError4);
    }
  }
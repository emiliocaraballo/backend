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
        messageError.createdAt=Date();
        messageError.userCreated=1; 
        messageError.status=1;
        await em.save(messageError);

        const messageError2=new MessageError();
        messageError2.code="USER_PASSWORD_VERIFY";
        messageError2.description="El nombre de usuario o contraseña son incorrectos.";
        messageError2.title="Lo sentimos.";
        messageError2.createdAt=Date();
        messageError2.userCreated=1; 
        messageError2.status=1;
        await em.save(messageError2)
      
        const messageError3=new MessageError();
        messageError3.code="AUTHORIZATION_FOUND";
        messageError3.description="No esta autenticado.";
        messageError3.title="Lo sentimos no tiene los permiso requerido.";
        messageError3.createdAt=Date();
        messageError3.userCreated=1; 
        messageError3.status=1;
        await em.save(messageError3);

        const messageError4=new MessageError();
        messageError4.code="AUTHORIZATION_INVALID";
        messageError4.description="Su Auth ha expirado.";
        messageError4.title="Lo sentimos.";
        messageError4.createdAt=Date();
        messageError4.userCreated=1; 
        messageError4.status=1;
        await em.save(messageError4)
        const messageError5=new MessageError();
        messageError5.code="NOT_REQUEST";
        messageError5.description="No se pudo generar la solicitud, inténtalo de nuevo.";
        messageError5.title="Lo sentimos.";
        messageError5.createdAt=Date();
        messageError5.userCreated=1; 
        messageError5.status=1;
        await em.save(messageError5)


        const messageError6=new MessageError();
        messageError6.code="PENDING_REQUEST";
        messageError6.description="Tiene una solicitud pendiente que aun no ha expirado, por favor revise su correo electrónico.";
        messageError6.title="Lo sentimos.";
        messageError6.createdAt=Date();
        messageError6.userCreated=1; 
        messageError6.status=1;
       
        return await em.save(messageError6);
    }
  }
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
        messageError3.description="No tiene los permiso requerido.";
        messageError3.title="Lo sentimos.";
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
        messageError5.description="No se pudo completar la solicitud, inténtalo de nuevo.";
        messageError5.title="Lo sentimos.";
        messageError5.createdAt=Date();
        messageError5.userCreated=1; 
        messageError5.status=1;
        await em.save(messageError5)


        const messageError6=new MessageError();
        messageError6.code="NOT_INVALID_REQUEST";
        messageError6.description="Ya esta solicitud ha sido procesada anteriormente.";
        messageError6.title="Lo sentimos.";
        messageError6.createdAt=Date();
        messageError6.userCreated=1; 
        messageError6.status=1;
        await em.save(messageError6)

        const messageError7=new MessageError();
        messageError7.code="MENU_NOT_FOUND";
        messageError7.description="El menu no existe, por favor verifique la información.";
        messageError7.title="Lo sentimos.";
        messageError7.createdAt=Date();
        messageError7.userCreated=1; 
        messageError7.status=1;
        await em.save(messageError7)
     
        const messageError8=new MessageError();
        messageError8.code="PROFILE_NOT_FOUND";
        messageError8.description="El perfil no existe, por favor verifique la información.";
        messageError8.title="Lo sentimos.";
        messageError8.createdAt=Date();
        messageError8.userCreated=1; 
        messageError8.status=1;
        await em.save(messageError8)
     
        const messageError9=new MessageError();
        messageError9.code="EMAIL_EXISTS";
        messageError9.description="Este email ya existe.";
        messageError9.title="Lo sentimos.";
        messageError9.createdAt=Date();
        messageError9.userCreated=1; 
        messageError9.status=1;
        await em.save(messageError9)

        const messageError10=new MessageError();
        messageError10.code="IDENTIFICATION_EXISTS";
        messageError10.description="La Identificación ya existe.";
        messageError10.title="Lo sentimos.";
        messageError10.createdAt=Date();
        messageError10.userCreated=1; 
        messageError10.status=1;
        await em.save(messageError10);


        // const messageError11=new MessageError();
        // messageError11.code="PROFILE_NOT_FOUND";
        // messageError11.description="El perfil no existe, por favor verifique la información.";
        // messageError11.title="Lo sentimos.";
        // messageError11.createdAt=Date();
        // messageError11.userCreated=1; 
        // messageError11.status=1;




        const messageError0=new MessageError();
        messageError0.code="PENDING_REQUEST";
        messageError0.description="Tiene una solicitud pendiente que aun no ha expirado, por favor revise su correo electrónico.";
        messageError0.title="Lo sentimos.";
        messageError0.createdAt=Date();
        messageError0.userCreated=1; 
        messageError0.status=1;
       
      
       
        return await em.save(messageError0);
    }
  }
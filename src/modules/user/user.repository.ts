import { getRepository } from 'typeorm';
import { to } from 'await-to-js';

import { IQueryResponse, ITokenActivePass } from 'src/interfaces/repository'
import { User } from 'src/database/entity/user'
import { IUser, IUserData } from "src/interfaces/user";
import { auth } from 'src/middleware/auth';
import { UserPasswordHistory } from 'src/database/entity/userPasswordHistory';
import { general } from 'src/config/general';
import { mailer } from 'src/config/mail';

class UserRepository{

    public validateUser=async (user: string): Promise<IQueryResponse> => {
        const Query=getRepository(User).findOne({select:["email","identification","name","last_name","phone","id"],where:{email:user.toLocaleLowerCase()}});
        
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

    public login=async (data: IUser): Promise<IQueryResponse> => {

        const Query=getRepository(User).findOne({select:["email","identification","name","last_name","phone","id","password","sequence"],where:{email:data.username.toLocaleLowerCase()}});
      

        const [errorResponse, response] = await to(Query);
        if (!response) {
            return {
                statusCode:400,
                message:'USER_PASSWORD_VERIFY'
            }
        }

        if(!await this.checkPassword(data.password,response.password)){
            return {
                statusCode:400,
                message:'USER_PASSWORD_VERIFY'
            }
        }

        const userT:IUserData={
            id:response.id,
            sequence:response.sequence
        }

       const token=await auth.generateToken(userT);

       const user={
        id:response.id,
        sequence:response.sequence,
        name:response.name,
        last_name:response.last_name,
        phone:response.phone,
        identification:response.identification,
        email:response.email,
        }
        return {
            statusCode:200,
            token:token,
            data:user
        }
    }
    
    public changePassword=async (user: string): Promise<IQueryResponse> => {

       
        
        const Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence"],where:{email:user.toLocaleLowerCase()}});
        const [errorResponse, response] = await to(Query);
       
        if (!response) {
            return {
                statusCode:404,
                message:'USER_NOT_FOUND'
            }
        }
        // el sequence se usuario
        const sequence=response.sequence;

      

        const QueryUserPasswordHistory=getRepository(UserPasswordHistory).createQueryBuilder("userPasswordHistory")
        .innerJoin("users_admins","User","userPasswordHistory.user_admin_sequence=User.sequence")
        .where("User.sequence=:sequence",{sequence:sequence})
        .limit(1)
        .orderBy("userPasswordHistory.createdAt","DESC")
        .getMany();
        
        const [errorPassword, responsePassword] = await to(QueryUserPasswordHistory);  
        
        
        if(responsePassword.length>0){
            // paso 1 ver si ya expiro y si el estado es 0
            var status:number=responsePassword[0].status;
            var createdAt:string=responsePassword[0].createdAt;
            var minute=general.diff_minute(general.dateNow(),general.dateFormat(createdAt));
            if(minute<=60 && status==0){
                return {
                    statusCode:400,
                    message:'PENDING_REQUEST'
                }
            }
        }

       

        const result=await this.createPasswordHistory(response);
        if(!result){
            // no se pudo general la solicitud.
            return {
                statusCode:400,
                message:'NOT_REQUEST'
            }
        }

        const data={
            sequence:result,
            userId:sequence
        }
        const token=await auth.generateToken(data,60);
         
          // se envia al correo.
         mailer.mainChangePassword(response.name,token);
        return {
            statusCode:201,
            message:"Su solicitud ha sido exitosa"
        }
    }

    public activePassword=async (password:string,data:ITokenActivePass): Promise<IQueryResponse> => {

        const UserPasswordHistorySeq=data.sequence;

        const Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence","password"],where:{sequence:data.userId}});
        const [errorResponse, response] = await to(Query);
        if (!response) {
            return {
                statusCode:404,
                message:'USER_NOT_FOUND'
            }
        }
        // el sequence se usuario
        const userId=response.sequence;

        const QueryUserPasswordHistory=getRepository(UserPasswordHistory).createQueryBuilder("userPasswordHistory")
        .innerJoin("users_admins","User","userPasswordHistory.user_admin_sequence=User.sequence")
        .where("userPasswordHistory.sequence=:sequence",{sequence:UserPasswordHistorySeq})
        .limit(1)
        .getMany();
        
        const [errorPassword, responsePassword] = await to(QueryUserPasswordHistory);   
        if(!responsePassword){
            return {
                statusCode:400,
                message:'PENDING_REQUEST'
            }
        }
       
        if(responsePassword[0].status==1){
            return {
                statusCode:400,
                message:'NOT_INVALID_REQUEST'
            }
        }
        

        var passwordOld= response.password;
        var passwordNew=await general.encryptOne(password) ;
       
        const isUpdatePass=await getRepository(UserPasswordHistory).update(UserPasswordHistorySeq,{
            password_new:passwordNew,
            password_old:passwordOld,
            updatedAt:general.dateNow(),
            status:1
        });

        if(isUpdatePass.affected==0){
            return {
                statusCode:400,
                message:'NOT_REQUEST'
            }
        }

        // se cambia la contraseña en el usuario
        const isUpdateUser=await getRepository(User).update(userId,{
            password:passwordNew,
            updatedAt:general.dateNow()
        });
        
        if(isUpdateUser.affected==0){
            return {
                statusCode:400,
                message:'NOT_REQUEST'
            }
        }  
        
        
        return {
            statusCode:201,
            message:"Su contraseña ha sido cambiada de forma exitosa."
        }
    }

    public create=async (user:IUser,data:ITokenActivePass): Promise<IQueryResponse> => {

        var Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence","password"],where:{email:user.mail.toLocaleLowerCase()}});
        var [errorResponse, response] = await to(Query);
        if (errorResponse || !response) {
            return {
                statusCode:404,
                message:'EMAIL_EXISTS'
            }
        }
        
         Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence","password"],where:{identification:user.identification.toLocaleLowerCase()}});
         [errorResponse, response] = await to(Query);
        if (errorResponse || !response) {
            return {
                statusCode:404,
                message:'IDENTIFICATION_EXISTS'
            }
        }


         Query=getRepository(User).save(
            {
                createdAt:general.dateNow(),
                updatedAt:general.dateNow(),
                email:user.mail.toLocaleLowerCase(),
                identification:user.identification,
                name:user.name,
                last_name:user.last_name,
                phone:user.phone,
                status:user.status,
                userCreated:data.userId,
                userUpdated:data.userId,
                password:await general.encryptOne(user.password)
            }
         );
         [errorResponse, response] = await to(Query);
         if (errorResponse || !response) {
            return {
                statusCode:404,
                message:'NOT_REQUEST'
            }
        }

       
    
        return {
            statusCode:201,
            message:"EL usuario ha sido creado con exito."
        }
    }

    public update=async (user:IUser,data:ITokenActivePass): Promise<IQueryResponse> => {

       
    
        return {
            statusCode:201,
            message:"EL usuario ha sido creado con exito."
        }
    }


    
    // general una nueva solicitd para cambio de contraseña
    private createPasswordHistory=async(user:User): Promise<boolean | number | undefined> =>{
         
        const userPasswordHistory=new UserPasswordHistory();
        userPasswordHistory.UserSequence=user;
        userPasswordHistory.createdAt=general.dateNow();
        userPasswordHistory.updatedAt=general.dateNow();
        userPasswordHistory.userCreated=user.sequence;
        userPasswordHistory.userUpdated=user.sequence;
        userPasswordHistory.userUpdated=user.sequence;
        userPasswordHistory.status=0;
       
        const [errorPassword, response] = await to(getRepository(UserPasswordHistory).save(userPasswordHistory));
        var sequence: boolean | number | undefined=false;
        if(response){
            sequence=response.sequence;
        }
        return sequence;
    }

    // se valida el password si es igual para el hash
    private checkPassword=async (password:string,passwordHash:string): Promise<boolean> => {
        return general.encryptCompareOne(password,passwordHash);
    }
}
export const userRepository=new UserRepository;
import { getRepository } from 'typeorm';
import { to } from 'await-to-js';

import { IQueryResponse, ITokenActivePass } from 'src/interfaces/repository'
import { User } from 'src/database/entity/user'
import { IUser, IUserData } from "src/interfaces/user";
import { auth } from 'src/middleware/auth';
import { UserPasswordHistory } from 'src/database/entity/userPasswordHistory';
import { general } from 'src/config/general';
import { mailer } from 'src/config/mail';
import { Profile } from 'src/database/entity/profile';
import { Apirror } from 'src/middleware/customError';

class UserRepository{

    public validateUser=async (user: string): Promise<IQueryResponse> => {
        const Query=getRepository(User).findOne({select:["email","identification","name","last_name","phone","id"],where:{email:user.toLocaleLowerCase()}});
        const [errorResponse, response] = await to(Query);
        if (!response) {
            throw new Apirror("USER_NOT_FOUND",404);
        }
        return {
            data:response
        }
    }

    public login=async (data: IUser): Promise<IQueryResponse> => {
        const Query=getRepository(User).findOne({select:["email","identification","name","last_name","phone","id","password","sequence"],where:{email:data.username.toLocaleLowerCase()}});
        const [errorResponse, response] = await to(Query);
        if (!response) {
            throw new Apirror("USER_PASSWORD_VERIFY",400);
        }
        if(!await this.checkPassword(data.password,response.password)){
            throw new Apirror("USER_PASSWORD_VERIFY",400);
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
            token:token,
            data:user
        }
    }
    
    public changePassword=async (user: string): Promise<IQueryResponse> => {
        const Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence"],where:{email:user.toLocaleLowerCase()}});
        const [errorResponse, response] = await to(Query);
        if (!response) {
            throw new Apirror("USER_NOT_FOUND",404);
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
                throw new Apirror("PENDING_REQUEST",400);
            }
        }
        const result=await this.createPasswordHistory(response);
        if(!result){
            // no se pudo general la solicitud.
            throw new Apirror("NOT_REQUEST",400);
        }
        const data={
            sequence:result,
            userId:sequence
        }
        const token=await auth.generateToken(data,60);
          // se envia al correo.
         mailer.mainChangePassword(response.name,token);
        return {
            message:"Su solicitud ha sido exitosa"
        }
    }

    public activePassword=async (password:string,data:ITokenActivePass): Promise<IQueryResponse> => {
        const UserPasswordHistorySeq=data.sequence;
        const Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence","password"],where:{sequence:data.userId}});
        const [errorResponse, response] = await to(Query);
        if (!response) {
            throw new Apirror("USER_NOT_FOUND",404);
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
            throw new Apirror("PENDING_REQUEST",400);
        }
        if(responsePassword[0].status==1){
            throw new Apirror("NOT_INVALID_REQUEST",400);
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
            throw new Apirror("NOT_REQUEST",400);
        }

        // se cambia la contraseña en el usuario
        const isUpdateUser=await getRepository(User).update(userId,{
            password:passwordNew,
            updatedAt:general.dateNow()
        });
        
        if(isUpdateUser.affected==0){
            throw new Apirror("NOT_REQUEST",400);
        }  
        
        
        return {
            message:"Su contraseña ha sido cambiada de forma exitosa."
        }
    }

    public create=async (user:IUser,data:ITokenActivePass): Promise<IQueryResponse> => {
        var QueryProfile=getRepository(Profile).findOne({select:["sequence"],where:{sequence:user.profiles_sequence}});
        var [errorResponseProfile, responseProfile] = await to(QueryProfile);
        if (errorResponseProfile || responseProfile) {
            throw new Apirror("PROFILE_NOT_FOUND",404);
        }
     
        var Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence","password"],where:{email:user.mail.toLocaleLowerCase()}});
        const  [errorResponse, response] = await to(Query);
        if (errorResponse || response) {
            throw new Apirror("EMAIL_EXISTS",404);
        }
        Query=getRepository(User).findOne({select:["email","name","last_name","id","sequence","password"],where:{identification:user.identification.toLocaleLowerCase()}});
        const  [errorResponse2, response2] = await to(Query);
        if (errorResponse2 || response2) {
            // return {
            //     statusCode:404,
            //     message:'IDENTIFICATION_EXISTS'
            // }
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
                password:await general.encryptOne(user.password),
                //profileSequence:,
                role:1
            }
         );
         const  [errorResponse3, response3] = await to(Query);
         if (errorResponse3 || !response3) {
            throw new Apirror("NOT_REQUEST",404);
         }
         return {
            message:"EL usuario ha sido creado con exito."
         }
    }

    public update=async (user:IUser,data:ITokenActivePass): Promise<IQueryResponse> => {
        return {
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
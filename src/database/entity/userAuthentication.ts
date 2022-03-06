import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm'
import { User } from 'src/database/entity/user';
@Entity({name:'users_authentications'})
export class UserAuthentication {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;
    @Column({name:'code_auth',type:"varchar"})
    codeAuth: string;
    @Column({name:'code_secret',type:"varchar"})
    codeSecret: string;
    @Column({name:'code_imagen',type:"text"})
    codeImagen: string;
    @Column({type:'int',/*length:1*/})
    status: number;
    @Column({name:'created_at',type:'timestamp',default:'now()'})
    createdAt: string;
    @Column({name:'updated_at',type:'timestamp', nullable: true,default:'now()'})
    updatedAt: string;
    @Column({name:'user_created',type:'int'})
    userCreated: number;
    @Column({name:'user_updated',type:'int', nullable: true})
    userUpdated: number;
    @ManyToOne(() => User, User => User.sequence)
    @JoinColumn({name:'user_admins_sequence'})
    UserSequence: User;
}
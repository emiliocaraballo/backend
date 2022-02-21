import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm'
import { UserAdmin } from 'src/database/entity/userAdmin';
@Entity({name:'users_authentications'})
export class UserAuthentication {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;
    @Column({type:"varchar"})
    code_auth: string;
    @Column({type:"varchar"})
    code_secret: string;
    @Column({type:"text"})
    code_imagen: string;

    @Column({type:'int',/*length:1*/})
    status: number;
    @Column({type:'timestamp',default:'now()'})
    created_at: string;
    @Column({type:'timestamp', nullable: true,default:'now()'})
    updated_at: string;
    @Column({type:'int'})
    user_created: number;
    @Column({type:'int', nullable: true})
    user_updated: number;

    @ManyToOne(() => UserAdmin, userAdmin => userAdmin.sequence)
    @JoinColumn({name:'user_admins_sequence'})
    userAdminSequence: UserAdmin;
}
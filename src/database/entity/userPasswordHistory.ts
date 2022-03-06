import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm'
import { User } from 'src/database/entity/user';
import { general } from 'src/config/general';
@Entity({name:'users_password_historys'})
export class UserPasswordHistory {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;
    @Column({type:"varchar", nullable: true})
    password_new: string;
    @Column({type:"varchar", nullable: true})
    password_old: string;
    @Column({type:"int"})
    status: number;
    @Column({name:'created_at',type:'timestamp'})
    createdAt: string;
    @Column({name:'updated_at',type:'timestamp', nullable: true})
    updatedAt: string;
    @Column({name:'user_created',type:'int'})
    userCreated: number;
    @Column({name:'user_updated',type:'int', nullable: true})
    userUpdated: number;
    @ManyToOne(() => User, User => User.sequence)
    @JoinColumn({name:'user_admin_sequence'})
    UserSequence: User;
}
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { User } from 'src/database/entity/user';
import { Notification } from 'src/database/entity/notification';
@Entity({name:'notifications_users'})
export class NotificationUser {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;  
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
    @ManyToOne(() => Notification, notification => notification.sequence)
    @JoinColumn({name:'notifications_sequence'})
    notificationsSequence: Notification;
    @ManyToOne(() => User, User => User.sequence)
    @JoinColumn({name:'users_admins_sequence'})
    usersAdminsSequence: User;
}
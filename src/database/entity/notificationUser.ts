import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { UserAdmin } from 'src/database/entity/userAdmin';
import { Notification } from 'src/database/entity/notification';
@Entity({name:'notifications_users'})
export class NotificationUser {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;  
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

    @ManyToOne(() => Notification, notification => notification.sequence)
    @JoinColumn({name:'notifications_sequence'})
    notificationsSequence: Notification;
    
    @ManyToOne(() => UserAdmin, userAdmin => userAdmin.sequence)
    @JoinColumn({name:'users_admins_sequence'})
    usersAdminsSequence: UserAdmin;
}
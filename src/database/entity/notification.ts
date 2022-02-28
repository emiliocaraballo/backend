import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name:'notifications'})

export class Notification {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;  

    @Column({type:'varchar'})
    title: string;
    @Column({type:'text'})
    description: string;
    @Column({name:'description_short',type:'varchar'})
    descriptionShort: string;
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

}
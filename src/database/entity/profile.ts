import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name:'profiles'})
export class Profile {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;
    @Column({type:"varchar"})
    name: string;
    @Column({type:"text",nullable:true})
    description: string;
    @Column({type:"varchar",nullable:true})
    icon: string;
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
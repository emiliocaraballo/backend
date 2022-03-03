import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity({name:'menus'})
export class Menu {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;
    @Column({type:"varchar"})
    name: string;
    @Column({type:"int"})
    order: number;
    @Column({type:"text",nullable:true})
    description: string;
    @Column({type:"int",nullable:true})
    parentid: number;
    @Column({type:"varchar"})
    url: string;
    @Column({type:"varchar"})
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
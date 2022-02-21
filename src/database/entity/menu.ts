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
}
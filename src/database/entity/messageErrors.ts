import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity({name:'message_errors'})
export class MessageError {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;
    @Column({type:"varchar"})
    code: string;
    @Column({type:"varchar"})
    title: string;
    @Column({type:"varchar"})
    description: string;
    @Column({type:'int'})
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
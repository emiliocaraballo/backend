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
    @Column({type:'timestamp',default:'now()'})
    created_at: string;
    @Column({type:'timestamp', nullable: true,default:'now()'})
    updated_at: string;
    @Column({type:'int'})
    user_created: number;
    @Column({type:'int', nullable: true})
    user_updated: number;
}
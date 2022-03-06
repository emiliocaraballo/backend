import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Profile } from 'src/database/entity/profile';

@Entity({name:'users'})
export class  User {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;

    @Column({type:"varchar"})
    name: string;
    @Column({type:"varchar"})
    last_name: string;
    @Column({type:"varchar"})
    phone: string;
    @Column({type:"varchar"})
    identification: string;
    @Column({type:"varchar"})
    password: string;
    @Column({type:"varchar"})
    email: string;
    @Column({type:"int"})
    role: number;
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

    @ManyToOne(() => Profile, profile => profile.sequence)
    @JoinColumn({name:'profiles_sequence'})
    profileSequence: Profile;
}
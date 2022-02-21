import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Profile } from 'src/database/entity/profile';

@Entity({name:'users_admins'})
export class  UserAdmin {
    @Column({type:'uuid'})
    id: string;
    @PrimaryGeneratedColumn()
    sequence: number;

    @Column({type:"varchar"})
    names: string;
    @Column({type:"varchar"})
    phone: string;
    @Column({type:"varchar"})
    identification: string;
    @Column({type:"varchar"})
    password: string;
    @Column({type:"varchar"})
    email: string;
    @Column({type:"int",/*length:1*/})
    role: number;
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

    @ManyToOne(() => Profile, profile => profile.sequence)
    @JoinColumn({name:'profiles_sequence'})
    profileSequence: Profile;
}
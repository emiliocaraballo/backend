import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'


import { Menu } from 'src/database/entity/menu'
import { Profile } from 'src/database/entity/profile';

@Entity({name:'menus_has_profiles'})
export class MenuHasProfile {
    
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
    @ManyToOne(() => Menu, menu => menu.sequence)
    @JoinColumn({name:'menus_sequence'})
    menusSequence: Menu;
    @ManyToOne(() => Profile, profile => profile.sequence)
    @JoinColumn({name:'profiles_sequence'})
    profilesSequence: Profile;

}
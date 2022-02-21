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
    @Column({type:'timestamp',default:'now()'})
    created_at: string;
    @Column({type:'timestamp', nullable: true,default:'now()'})
    updated_at: string;
    @Column({type:'int'})
    user_created: number;
    @Column({type:'int', nullable: true})
    user_updated: number;

    @ManyToOne(() => Menu, menu => menu.sequence)
    @JoinColumn({name:'menus_sequence'})
    menusSequence: Menu;

    @ManyToOne(() => Profile, profile => profile.sequence)
    @JoinColumn({name:'profiles_sequence'})
    profilesSequence: Profile;

}
import { IUserDataToken  } from 'src/interfaces/user'

export interface IProfile{
    id?: string
    sequence?:number
    name:string
    description?:string
    icon?:string
    status:number
    createdAt:string
    updatedAt?:string
    menu:IProfileHasMenu[]
    users:IUserDataToken
}

interface IProfileHasMenu{
    id?: string
    sequence?:number
    status: number
    createdAt:string
    updatedAt?:string
    menusSequence: number
    profilesSequence: number
}
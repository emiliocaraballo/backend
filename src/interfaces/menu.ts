
import { IUserDataToken  } from 'src/interfaces/user'

export interface IMenu{
    id?:string
    sequence: number
    name: string
    order: number
    icon: string
    description?: string
    parentid?: number
    url:string
    status: number
    createdAt:string
    updateAt:string
    userCreated: number
    userUpdated: number
    users: IUserDataToken
}
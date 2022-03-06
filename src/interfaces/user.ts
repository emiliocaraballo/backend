export interface IUser {
    id?: string
    sequence?: number
    name: string
    last_name: string
    username: string
    password: string
    mail: string
    identification: string
    phone: string
    status: number
    profiles_sequence: number
}


// para el auth de middleware y su uso en los router
export interface IUserData{
    id: string
    sequence: number
}

export interface IUserDataToken{
    data: IUserData
    iat: number
    exp: number
}
// end:para el auth de middleware y su uso en los router
export interface IUser {
    id?: string
    names: string
    username: string
    password: string
    mail: string
    identification: string
    phone: string
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
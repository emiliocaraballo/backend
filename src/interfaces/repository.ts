export interface IQueryResponse{
    statusCode?: number
    data?: any
    token?:string
    message?: string
}

export interface ITokenUserAuth{
    id: string
    names: string
    phone: string
    identification:string
    email:string
}

export interface ITokenActivePass{
    sequence: number
    userId: number

}
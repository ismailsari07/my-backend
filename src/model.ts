export interface User {
    id: number,
    name: string, 
    email: string
}

export interface Output {
    Response: object,
    Error: Array<Error>,
    Status: boolean
}

export interface Error {
    ErrorMessage: string,
    ErrorCode: number
}
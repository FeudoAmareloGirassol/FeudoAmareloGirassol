export interface LoginResponse extends LoginResponseBase{
    token: LoginResponse;
}

export interface LoginResponseBase{
    access: string;
    refresh: string
}
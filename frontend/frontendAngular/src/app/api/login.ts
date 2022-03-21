export interface loginResponse extends loginResponseBase{
    token: loginResponse;
}

export interface loginResponseBase{
    access: string;
    refresh: string
}
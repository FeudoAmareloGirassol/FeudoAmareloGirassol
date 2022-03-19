export interface CustomerModel extends CustomerBase{
    id: number;
}

export interface CustomerRequest{
    user: CustomerBase
}

export interface CustomerBase{

    // name: string;
    email: string;
    password: string;
}

export interface CustomerModel extends CustomerBase {
  id: number;
}

export interface CustomerRequest {
  email: string;
  password: string;
}

export interface CustomerBase {
  email: string;
  password: string;
}

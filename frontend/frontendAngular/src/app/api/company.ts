import { CustomerBase } from '../api/customer';

export interface CompanyModel extends CompanyBase {
  id: number;
}

export interface CompanyRequest {
  user: CustomerBase
  company: CompanyBase
}

export interface CompanyBase {
  name: string;
  cnpj: string;
  address: string;
  category: string;
  cep: string;
  city: string;
  uf: string;
  telephone_number: string;
}

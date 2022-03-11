import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExampleCreateRequest, ExampleModel } from '../api/examples';

const apiUrl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(public http: HttpClient) { }

  listExample(){
    // get<TIPO_DE_RETORNO_ESPERADO>
    return this.http.get<ExampleModel[]>(`${apiUrl}/examples/`);
  }

  createExample(request: ExampleCreateRequest){
    return this.http.post(`${apiUrl}/examples/`, request);
  }
}

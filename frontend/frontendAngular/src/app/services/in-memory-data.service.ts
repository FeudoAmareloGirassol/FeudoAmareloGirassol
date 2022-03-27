import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categoria } from '../api/categoria';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categorias = [
      { id: 12, name: 'CABELEREIRA' },
      { id: 13, name: 'BARBEIRO' },
      { id: 14, name: 'MANICURE' },
      { id: 15, name: 'DENTISTA' },
      { id: 16, name: 'MECÂNICO' },
      { id: 13, name: 'BARBEIRO' },
      { id: 14, name: 'MANICURE' },
      { id: 15, name: 'DENTISTA' },
      { id: 16, name: 'MECÂNICO' },
    ];
    
    const cards = [
      {
        id: 1,
        name: 'CabeleilaLeila',
        address: 'Rua 18',
        address_number: 224,
        city: 'Rio de Fevereiro',
        state: 'SP',
        district: 'Rio de Março'
      },
      {
        id: 2,
        name: 'Seu zé seu Mané',
        address: 'Comercial Sul qs 12',
        address_number: 224,
        city: 'Taguatinga',
        state: 'BSB',
        district: 'Rodô'
      },
    ];
    return {categorias, cards};
  }


  genId(categorias: Categoria[]): number {
    return categorias.length > 0 ? Math.max(...categorias.map(categoria => categoria.id)) + 1 : 11;
  }
}


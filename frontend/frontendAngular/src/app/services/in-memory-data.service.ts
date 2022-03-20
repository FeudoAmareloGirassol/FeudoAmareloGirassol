import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categoria } from '../categoria';

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
    ];
    return {categorias};
  }


  genId(categorias: Categoria[]): number {
    return categorias.length > 0 ? Math.max(...categorias.map(categoria => categoria.id)) + 1 : 11;
  }
}


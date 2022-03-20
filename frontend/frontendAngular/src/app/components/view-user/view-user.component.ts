import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/categoria';
import { CATEGORIAS } from 'src/app/mock-categorias';
import { ViewUserService } from 'src/app/services/view-user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  categorias = CATEGORIAS;
  selectedCategoria?: Categoria;

  constructor(private viewuserService: ViewUserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getCategorias();
  }


  onSelect(categoria: Categoria): void {
    this.selectedCategoria = categoria;
  }

  getCategorias(): void {
    this.viewuserService.getCategorias()
        .subscribe(categorias => this.categorias = categorias);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.viewuserService.addCategoria({ name } as Categoria)
      .subscribe(categoria => {
        this.categorias.push(categoria);
      });
  }

}

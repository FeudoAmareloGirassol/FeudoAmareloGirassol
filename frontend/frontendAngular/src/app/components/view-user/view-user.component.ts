import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Categoria } from '../../api/categoria';
import { ViewUserService } from '../../services/view-user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  categorias: Categoria[] = [];
  
  constructor(
    private viewuserService: ViewUserService,
    public router: Router,
    ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.viewuserService.getCategorias()
      .subscribe(categorias => this.categorias = categorias.slice(1, 5));
  }
}

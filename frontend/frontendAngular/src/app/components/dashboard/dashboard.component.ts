import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/categoria';
import { ViewUserService } from 'src/app/services/view-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private viewuserService: ViewUserService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.viewuserService.getCategorias()
      .subscribe(categorias => this.categorias = categorias.slice(1, 5));
  }

}

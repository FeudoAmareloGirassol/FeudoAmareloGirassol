import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Categoria } from '../../api/categoria';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  categorias: Categoria[] = [];
  
  constructor(
    public router: Router,
    ) { }

  ngOnInit(): void {
  }
}

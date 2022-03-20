import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from 'src/app/categoria';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ViewUserService } from 'src/app/services/view-user.service';


@Component({
  selector: 'app-view-user-detail',
  templateUrl: './view-user-detail.component.html',
  styleUrls: ['./view-user-detail.component.css']
})
export class ViewUserDetailComponent implements OnInit {

  categoria: Categoria | undefined;

  constructor(
    private route: ActivatedRoute,
    private viewuserService: ViewUserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCategoria();
  }

  getCategoria(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.viewuserService.getCategoria(id)
      .subscribe(categoria => this.categoria = categoria);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.categoria) {
      this.viewuserService.updateCategoria(this.categoria)
        .subscribe(() => this.goBack());
    }
  }

}

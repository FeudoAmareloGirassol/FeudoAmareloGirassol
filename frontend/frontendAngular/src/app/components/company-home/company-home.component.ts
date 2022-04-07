import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageLoginService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  logout() {
    this.localStorage.remove('token');
    this.router.navigate(['/login']);
  }
}
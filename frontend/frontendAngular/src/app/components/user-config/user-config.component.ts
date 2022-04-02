import { Component, OnInit } from '@angular/core';
import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  constructor(private localStorage: LocalStorageLoginService,
    private router: Router,) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.localStorage.remove('token');
    this.router.navigate(['/login']);
  }

}

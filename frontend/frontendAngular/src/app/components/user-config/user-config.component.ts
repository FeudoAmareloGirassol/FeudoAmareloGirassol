import { Component, OnInit } from '@angular/core';
import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { Router } from '@angular/router';
import { GetUsersService } from 'src/app/services/get-users.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  get :any =[];
  
  constructor(
    private localStorage: LocalStorageLoginService,
    private router: Router,
    private getUsers: GetUsersService
    ) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.localStorage.remove('token');
    this.router.navigate(['/login']);
  }

  teste(){
    this.getUsers.getUsers().subscribe(apiGet =>{
      this.get = apiGet
      console.log(apiGet)
    }, err =>{
      console.log(err)
    })
  }

}

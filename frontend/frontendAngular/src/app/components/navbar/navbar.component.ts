import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LocalStorageLoginService } from '../../services/local-storage-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router, 
    public localStorage: LocalStorageLoginService
    ) { }

  ngOnInit(): void {
  }

  direct(){
    if (this.localStorage.decodePayloadJWT().cnpj != null){
      this.router.navigate(['/company/home']);
    } else{
      this.router.navigate(['/user/home']);
    }
  }

}

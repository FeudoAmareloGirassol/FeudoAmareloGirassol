import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LocalStorageLoginService } from 'src/app/services/local-storage-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router, private localStorage: LocalStorageLoginService) { }

  ngOnInit(): void {
  }

  showUser(){
    console.log(this.localStorage.get('token'))
  }

}

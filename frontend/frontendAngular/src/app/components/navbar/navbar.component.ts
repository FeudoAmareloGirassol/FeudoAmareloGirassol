import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { MessageService } from '../../services/message-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router, 
    private messageService: MessageService, 
    public localStorage: LocalStorageLoginService
    ) { }

  ngOnInit(): void {
  }

  showUser(){
    this.messageService.showSuccess("Registrado com sucesso", "Ok", 'success-snackbar');
  }

}

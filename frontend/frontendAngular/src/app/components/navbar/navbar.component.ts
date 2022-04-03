import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { MessageService } from '../../services/message-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public url1!: string;
  name = 'Get Current Url Route Demo';
  currentRoute!: string;

  constructor(
    public router: Router,
    private messageService: MessageService,
    public localStorage: LocalStorageLoginService
  ) { }

  ngOnInit(): void {
  }

  showUser() {
    this.messageService.showSuccess("Registrado com sucesso", "Ok");
  }

  direct() {
    if (this.localStorage.get("isCompany")) {
      this.router.navigate(['/company/home']);
    } else {
      this.router.navigate(['/user/home']);
    }
  }

}

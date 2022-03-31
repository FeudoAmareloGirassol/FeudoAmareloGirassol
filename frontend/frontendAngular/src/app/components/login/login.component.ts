import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../api/authentication';
import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  
  constructor(
    public fb: FormBuilder, 
    public loginService: AuthenticationService, 
    private localStorage: LocalStorageLoginService, 
    private router: Router,
    ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  submit(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    let request: LoginRequest = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };
    
    this.isLoading = true;

    this.loginService.login(request).subscribe((response) => {
      this.localStorage.set("token", response.access);
      this.isLoading = false;
      if (this.localStorage.decodePayloadJWT().cnpj != null){
        this.router.navigate(['/company/home']);
      } else{
        this.router.navigate(['/user/home']);
      }
    }, _ => this.isLoading = false);
  }
}

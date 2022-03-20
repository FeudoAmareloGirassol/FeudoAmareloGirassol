import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../api/authentication';
import { LocalStorageLoginService } from '../../services/local-storage-login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  
  constructor(public fb: FormBuilder, public loginService: AuthenticationService, private localStorage: LocalStorageLoginService) {
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
      console.log("Logged", response);
      var obj = JSON.stringify(response, ['access']);
      console.log(obj.slice(11, -2));
      localStorage.setItem("token", JSON.stringify(response));
      this.isLoading = false;
    }, _ => this.isLoading = false);
  }
}

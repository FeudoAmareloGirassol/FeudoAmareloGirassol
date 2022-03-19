import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../api/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;

  constructor(public fb: FormBuilder, public loginService: AuthenticationService) {
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
      this.isLoading = false;
    }, _ => this.isLoading = false);

  }

}

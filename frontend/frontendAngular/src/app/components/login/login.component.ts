import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginRequest } from '../../api/authentication';
import { UserModel } from '../../api/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(public fb: FormBuilder, public authenticationService: AuthenticationService) {
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
    this.authenticationService.login(request).subscribe((response: UserModel) => {
      console.log("Logged", response);
      this.isLoading = false;
    }, _ => this.isLoading = false);

  }
}

import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../api/authentication';
import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/api/company';
import UserTypeVerificationService from 'src/app/services/user-type-verification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //company!: CompanyModel;
  form: FormGroup;
  isLoading: boolean = false;
  
  constructor(
    public fb: FormBuilder, 
    public loginService: AuthenticationService, 
    private localStorage: LocalStorageLoginService, 
    private router: Router,
    //private userTypeVerificationService: UserTypeVerificationService
    ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    //this.getter();
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
      // if(company.id ==null){
      //   this.router.navigate(['/user/home']);
      // } else{
      //   this.router.navigate(['/company/home']);
      // }
      this.router.navigate(['/user/home']);
    }, _ => this.isLoading = false);
  }

  //possivel adição
 // getter(){
    //this.userTypeVerificationService.verification().subscribe((data:CompanyModel) => {
     // this.company = data;
   // })
  //}
}

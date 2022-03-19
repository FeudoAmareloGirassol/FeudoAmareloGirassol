import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerModel, CustomerRequest } from '../../api/customer';
import { CustomerRegisterService } from '../../services/customer-register.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    public fb: FormBuilder,
    public customerRegisterService: CustomerRegisterService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      // name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  

  submit(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.controls['password'].value != this.form.controls['confirm_password'].value) {
      // TODO criar um messageService com
      // showSuccess
      // showError
      // showWarning
      // personalizar pra aparecer no superior direito
      //this.messageService.showError("Senhas diferentes");
      this._snackBar.open("Senhas diferentes", "Ok");
      return;
    }

    let request: CustomerRequest = {
      user: {
        // name: this.registerCustomerForm.controls['name'].value,
        email:this.form.controls['email'].value,
        password:this.form.controls['password'].value
      }
    };

    this.isLoading = true;
    this.customerRegisterService.registerCustomer(request).subscribe((response: CustomerModel) => {
      console.log("registered", response);
      this.isLoading = false;
    }, _ => this.isLoading = false);
  }

}

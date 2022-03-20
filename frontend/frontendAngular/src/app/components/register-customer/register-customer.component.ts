
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message-service.service';
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
    private snackBService:MessageService
  ) {
    this.form = this.fb.group({
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
      this.snackBService.showError("Senhas diferentes", "Ok");
      return;
    }
    
    let senha1 = <String>this.form.controls['password'].value;
    let senha2 = <String>this.form.controls['confirm_password'].value;

    if (
    this.form.controls['password'].value == this.form.controls['confirm_password'].value &&
    senha1.length < 5 && senha2.length < 5) {
      this.snackBService.showWarning("Senhas muito curtas!", "Ok");
      return;
    }

    let request: CustomerRequest = {
      user: {
        email:this.form.controls['email'].value,
        password:this.form.controls['password'].value
      }
    };

    this.isLoading = true;
    this.customerRegisterService.registerCustomer(request).subscribe((response: CustomerModel) => {
      this.snackBService.showError("Registrado com sucesso", "Ok");
      this.isLoading = false;
    }, _ => this.isLoading = false);
  }

}

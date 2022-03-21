
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message-service.service';
import { CustomerModel, CustomerRequest } from '../../api/customer';
import { CustomerRegisterService } from '../../services/customer-register.service';
import { Router } from '@angular/router';

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
    private messageService:MessageService,
    private router: Router
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
      this.messageService.showError("Senhas diferentes", "Ok", 'error-snackbar');
      return;
    }
    
    let senha1 = this.form.controls['password'].value;
    let senha2 = this.form.controls['confirm_password'].value;

    if (
    this.form.controls['password'].value == this.form.controls['confirm_password'].value &&
    senha1.length < 5 && senha2.length < 5) {
      this.messageService.showWarning("Senhas muito curtas!", "Ok", 'warning-snackbar');
      return;
    }

    let request: CustomerRequest = {
      user: {
        email:this.form.controls['email'].value,
        password:this.form.controls['password'].value,
        confirm_password:this.form.controls['password'].value,
      }
    };

    this.isLoading = true;
    this.customerRegisterService.registerCustomer(request).subscribe((response: CustomerModel) => {
      this.messageService.showSuccess("Registrado com sucesso", "Ok", 'success-snackbar');
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, _ => this.isLoading = false);
  }

}

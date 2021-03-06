import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { CustomerModel, CustomerRequest } from '../../api/customer';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.scss']
})
export class RegisterCustomerComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    public fb: FormBuilder,
    public customerRegisterService: CustomerService,
    private messageService: MessageService,
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


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let password1 = this.form.controls['password'].value;
    let password2 = this.form.controls['confirm_password'].value;

    if (password1 != password2) {
      this.messageService.showError("Senhas diferentes", "Ok");
      return;
    } else if (password1.length < 5 && password2.length < 5) {
      this.messageService.showWarning("Senhas muito curtas!", "Ok");
      return;
    }

    let request: CustomerRequest = {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value
    };

    this.isLoading = true;
    this.customerRegisterService.registerCustomer(request).subscribe((response: CustomerModel) => {
      this.messageService.showSuccess("Registrado com sucesso", "Ok");
      this.isLoading = false;
      this.router.navigate(['/login']);
    },() => {
      this.messageService.showError("E-mail já existente!", "Ok");
      this.isLoading = false;
    })
  }

}

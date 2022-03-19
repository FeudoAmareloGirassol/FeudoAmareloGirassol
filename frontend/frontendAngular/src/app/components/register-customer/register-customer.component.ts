import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {
  registerCustomerForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.registerCustomerForm = fb.group({
      name: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      address: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      city: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
  }

}

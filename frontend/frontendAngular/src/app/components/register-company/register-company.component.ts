import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageLoginService } from '../../services/local-storage-login.service';
import { CompanyModel, CompanyRequest } from '../../api/company';
import { CompanyRegisterService } from '../../services/company-register.service';
import { MessageService } from '../../services/message-service.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    public fb: FormBuilder, 
    public companyRegisterService: CompanyRegisterService,
    private messageService: MessageService,
    private router: Router
    ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      city: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      telephone_number: ['', [Validators.required]],
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
      this.messageService.showError("Senhas diferentes", "Ok", "error-snackbar");
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

    let request: CompanyRequest = {
      user: {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        confirm_password:this.form.controls['password'].value,
      },
      company: {
        name: this.form.controls['name'].value,
        cnpj: this.form.controls['cnpj'].value,
        adress: this.form.controls['adress'].value,
        cep: this.form.controls['cep'].value,
        city: this.form.controls['city'].value,
        uf: this.form.controls['uf'].value,
        telephone_number: this.form.controls['telephone_number'].value,
      }
    };

    this.isLoading = true;
    this.companyRegisterService.registerCompany(request).subscribe((response: CompanyModel) => {
      this.messageService.showSuccess("Registrado com sucesso", "Ok", "success-snackbar");
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, _ => this.isLoading = false);
  }



}

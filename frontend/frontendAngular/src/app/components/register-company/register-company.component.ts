import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyModel, CompanyRequest, StateModel } from '../../api/company';
import { MessageService } from '../../services/message.service';
import { CategoryModel } from '../../api/category';
import { CompanyService } from '../../services/company.service';
import { cnpj } from 'cpf-cnpj-validator';
@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})


export class RegisterCompanyComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  categories: CategoryModel[] = [
    { value: 'ADVOCACY', viewValue: 'Advocacia' },
    { value: 'HEALTH', viewValue: 'Saúde' },
    { value: 'TECHNICAL_ASSISTANCE', viewValue: 'Assistência Técnica' },
    { value: 'CIVIL_CONSTRUCTION', viewValue: 'Construção Civil' },
    { value: 'BEAUTY', viewValue: 'Beleza' },
    { value: 'EDUCATION', viewValue: 'Educação' },
    { value: 'DOMESTIC_SERVICES', viewValue: 'Serviços Domésticos' },
    { value: 'DESIGN', viewValue: 'Design' },
  ]

  states: StateModel[] = [
    { value: 'AC'},
    { value: 'AL'},
    { value: 'AM'},
    { value: 'AP'},
    { value: 'BA'},
    { value: 'CE'},
    { value: 'DF'},
    { value: 'ES'},
    { value: 'GO'},
    { value: 'MA'},
    { value: 'MG'},
    { value: 'MS'},
    { value: 'MT'},
    { value: 'PA'},
    { value: 'PB'},
    { value: 'PE'},
    { value: 'PI'},
    { value: 'PR'},
    { value: 'RJ'},
    { value: 'RN'},
    { value: 'RO'},
    { value: 'RR'},
    { value: 'RS'},
    { value: 'SC'},
    { value: 'SE'},
    { value: 'SP'},
    { value: 'TO'},
  ]

  constructor(
    public fb: FormBuilder,
    public companyRegisterService: CompanyService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      address: ['', [Validators.required]],
      category: ['', [Validators.required]],
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

    if(cnpj.isValid(this.form.controls['cnpj'].value) == false){
      this.messageService.showError("CNPJ INVÁLIDO!", "Ok");
      return;
    }

    let request: CompanyRequest = {
      user: {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value
      },
      company: {
        name: this.form.controls['name'].value,
        cnpj: this.form.controls['cnpj'].value,
        address: this.form.controls['address'].value,
        category: this.form.controls['category'].value,
        cep: this.form.controls['cep'].value,
        city: this.form.controls['city'].value,
        uf: this.form.controls['uf'].value,
        telephone_number: this.form.controls['telephone_number'].value,
      }
    };

    this.isLoading = true;
    this.companyRegisterService.registerCompany(request).subscribe((response: CompanyModel) => {
      this.messageService.showSuccess("Registrado com sucesso", "Ok");
      this.isLoading = false;
      this.router.navigate(['/login']);
    },(error) => {
      if(error['error']['company'] && error['error']['user']){
        this.messageService.showError("E-mail e CNPJ já cadastrado!", "Ok");
      } else if(error['error']['user']){
        this.messageService.showError("E-mail já cadastrado!", "Ok");
      } else if(error['error']['company']){
        this.messageService.showError("CNPJ já cadastrado!", "Ok");
      }

      this.isLoading = false;
    })
  }
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIGETService } from 'src/app/services/api-get.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyModel } from 'src/app/api/company';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SchedulingRegisterServiceService } from '../../services/scheduling-register-service.service';
import { SchedulingModel, SchedulingRequest } from '../../api/scheduling';
import { MessageService } from 'src/app/services/message-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  SchedulingForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private APIGET: APIGETService,
    @Inject(MAT_DIALOG_DATA) public company: CompanyModel,
    private fb: FormBuilder,
    private router: Router,
    public schedulingRegisterService: SchedulingRegisterServiceService,
    private messageService: MessageService,
  ) {
    this.SchedulingForm = this.fb.group({
      SchedulingDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    let newDate: moment.Moment = moment.utc(this.SchedulingForm.value.SchedulingDate).local();
    this.SchedulingForm.value['SchedulingDate'] = newDate.format("YYYY-MM-DD");
    if (this.SchedulingForm.invalid) {
      this.SchedulingForm.markAllAsTouched();
      return;
    }

    let request: SchedulingRequest = {
      schedulingDate: this.SchedulingForm.value['SchedulingDate'],
      company: this.company.id
    };

    this.isLoading = true;
    this.schedulingRegisterService.registerScheduling(request).subscribe((response: SchedulingModel) => {
      this.messageService.showSuccess("Agendamento feito com sucesso!", "Ok");
      this.isLoading = false;
    }, _ => this.isLoading = false);

  }

}

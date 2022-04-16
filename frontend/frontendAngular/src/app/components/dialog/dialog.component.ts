import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyModel } from 'src/app/api/company';
import * as moment from 'moment';
import { SchedulingModel, SchedulingRequest } from '../../api/scheduling';
import { MessageService } from '../../services/message.service';
import { CompanyService } from 'src/app/services/company.service';

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
    @Inject(MAT_DIALOG_DATA) public company: CompanyModel,
    private fb: FormBuilder,
    public schedulingRegisterService: CompanyService,
    private messageService: MessageService,
  ) {
    this.SchedulingForm = this.fb.group({
      SchedulingDate: ['', [Validators.required]],
      SchedulingHour: ['', [Validators.required]]
    });
  }

  minDate = new Date();
  tomorrow = new Date();


  ngOnInit(): void {
     this.tomorrow.setDate(this.minDate.getDate() + 1);
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
      schedulingTime: this.SchedulingForm.value.SchedulingHour,
      company: this.company.id
    };

    this.isLoading = true;
    this.schedulingRegisterService.registerScheduling(request).subscribe((response: SchedulingModel) => {
      this.messageService.showSuccess("Agendamento feito com sucesso!", "Ok");
      this.isLoading = false;
    }, _ => this.isLoading = false);
  }
}

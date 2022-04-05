import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIGETService } from 'src/app/services/api-get.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyModel } from 'src/app/api/company';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public SchedulingForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private APIGET: APIGETService,
    @Inject(MAT_DIALOG_DATA) public company: CompanyModel,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.SchedulingForm = this.fb.group({
      SchedulingDate: ['', [Validators.required]],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createScheduling(){
    let newDate: moment.Moment = moment.utc(this.SchedulingForm.value.SchedulingDate).local();
    this.SchedulingForm.value.SchedulingDate = newDate.format("DD-MM-YYYY");
    console.log(this.SchedulingForm.value);
  }

}


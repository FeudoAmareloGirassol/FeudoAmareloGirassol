import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIGETService } from 'src/app/services/api-get.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyModel } from 'src/app/api/company';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private APIGET: APIGETService,
    @Inject(MAT_DIALOG_DATA) public company: CompanyModel,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


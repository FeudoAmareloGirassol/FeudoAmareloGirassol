import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIGETService } from 'src/app/services/api-get.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  get :any =[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private APIGET:APIGETService,
    @Inject(MAT_DIALOG_DATA) public id: any,
  ) { }

  ngOnInit(): void {
  this.pegarIDGET();
  }

  pegarIDGET(){
    this.APIGET.getAPIID(this.id['idPass']).subscribe(apiGet =>{
      this.get = apiGet
    }, err =>{
      console.log(err)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


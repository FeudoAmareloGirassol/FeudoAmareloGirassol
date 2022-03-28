import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIGETService } from 'src/app/services/api-get.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  gets :any =[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private APIGET:APIGETService,
  ) { }

  ngOnInit(): void {
  this.listarCompany();
  }

  listarCompany(){
    this.APIGET.getCompany().subscribe(apiGet =>{
      this.gets = apiGet
      // console.log(this.gets[1]['company']['adress'])
    }, err =>{
      console.log(err)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


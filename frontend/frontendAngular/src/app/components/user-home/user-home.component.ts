import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenDialog(idPass:number){

    let dialogRef = this.dialog.open(DialogComponent,{
      data: { idPass: idPass },
      width:'30%',
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`The dialog result: ${result}`);
    })
  }

}
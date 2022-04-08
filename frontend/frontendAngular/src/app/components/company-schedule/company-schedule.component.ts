import { Component, OnInit } from '@angular/core';
import { SchedulingRegisterServiceService } from 'src/app/services/scheduling-register-service.service';

@Component({
  selector: 'app-company-schedule',
  templateUrl: './company-schedule.component.html',
  styleUrls: ['./company-schedule.component.scss']
})
export class CompanyScheduleComponent implements OnInit {

  schedulings : any = [];

  constructor(
    private SchedulingRegisterService: SchedulingRegisterServiceService,
  ) { }

  ngOnInit(): void {

    this.SchedulingRegisterService.getScheduling().subscribe(
      (data) =>{
        this.schedulings = data;
      },
      (error) => {
        console.log(error)
      })
    }

  }

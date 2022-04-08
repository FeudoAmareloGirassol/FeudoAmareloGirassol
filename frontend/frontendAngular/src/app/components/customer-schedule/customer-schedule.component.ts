import { Component, OnInit } from '@angular/core';
import { SchedulingRegisterServiceService } from 'src/app/services/scheduling-register-service.service';
import { GetCompanyService } from '../../services/get-companies.service'
@Component({
  selector: 'app-customer-schedule',
  templateUrl: './customer-schedule.component.html',
  styleUrls: ['./customer-schedule.component.scss']
})
export class CustomerScheduleComponent implements OnInit {

  schedulings : any = [];
  company : any = [];

  constructor(
    private SchedulingRegisterService: SchedulingRegisterServiceService,
    private GetCompanyService: GetCompanyService,
    ) { }

  ngOnInit(): void {

    this.SchedulingRegisterService.getScheduling().subscribe(
      (data) =>{
        this.GetCompanyService.getCompanies().subscribe(
          (company) =>{
            this.company = company
          },
          (error) =>{
            console.log(error)
          })
        this.schedulings = data;
      },
      (error) => {
        console.log(error)
      })
    }

}

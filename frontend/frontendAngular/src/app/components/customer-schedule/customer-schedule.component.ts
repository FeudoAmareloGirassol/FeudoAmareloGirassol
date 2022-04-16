import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CompanyService } from '../../services/company.service';
import { CompanyModel } from '../../api/company';
import { SchedulingModel } from '../../api/scheduling';


@Component({
  selector: 'app-customer-schedule',
  templateUrl: './customer-schedule.component.html',
  styleUrls: ['./customer-schedule.component.scss']
})

export class CustomerScheduleComponent implements OnInit {

  public schedulings: SchedulingModel[] = [];
  public company : CompanyModel[] = [];
  now: Date
  hour: String

  constructor(
    private schedulingRegisterService: CompanyService,
    private companyService: CompanyService,
    ) {
      let newDate: moment.Moment = moment.utc(new Date()).local();
      this.now = new Date();
      this.hour = newDate.format("HH:mm");
     }

  ngOnInit(): void {
    this.schedulingRegisterService.getScheduling().subscribe(
      (data: SchedulingModel[]) =>{
        this.companyService.getCompanies().subscribe(
          (company) =>{
            this.company = company
          })
        this.schedulings = data;
      })
    }

  compareDates(date1: Date, date2: Date){
    date1 = this.convertDateToUTC(new Date(date1))
    if(date1.getFullYear() >= date2.getFullYear()){
      if(date1.getFullYear() > date2.getFullYear()){
        return true
      }else{
        if(date1.getMonth() >= date2.getMonth()){
          if(date1.getDate() > date2.getDate()){
            return true;
          }else{
            return false;
          }
        } else{
          return false;
        }
      }
    } else{
      return false;
    }
  }

  compareHour(date1: Date, date2: Date, hora1: Date, hora2: String){
    let hora1Convert = hora1.toString();
    let Hora1Hora = hora1Convert.slice(0,2)
    let Hora1Minuto = hora1Convert.slice(3,5)

    let Hora2Hora = hora2.slice(0,2)
    let Hora2Minuto = hora2.slice(3,5)

    date1 = this.convertDateToUTC(new Date(date1))

    if(date1.getFullYear() >= date2.getFullYear()){
      if(date1.getMonth() >= date2.getMonth()){
        if(date1.getDate() == date2.getDate()){
          if(Hora1Hora >= Hora2Hora){
            if(Hora1Minuto >= Hora2Minuto){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        }else{
          return false;
        }
      } else{
        return false;
      }
    } else{
      return false;
    }
  }

  convertDateToUTC(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }
}

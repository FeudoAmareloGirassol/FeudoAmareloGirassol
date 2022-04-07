export interface SchedulingModel extends SchedulingBase{
  id: number;
}

export interface SchedulingRequest {
  schedulingDate: Date
  company: number
}

export interface SchedulingBase {
  schedulingDate: Date
}

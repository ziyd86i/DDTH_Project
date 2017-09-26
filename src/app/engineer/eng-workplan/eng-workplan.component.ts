import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { EngineerService } from '../engineer.service';
import {Appointment, Resource, Service} from './app.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../workplan';
import { Employees } from '../../employees';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'eng-workplan',
  templateUrl: './eng-workplan.component.html',
  styleUrls: ['./eng-workplan.component.css']
})
export class EngWorkplanComponent  {

  appointmentsData: Appointment[];
  currentDate: Date = new Date('2017-09-25 10:00:00');
  resourcesData: Resource[];
  switchModeNames: string[];

  ObservWork : Observable<Workplan[]>;
  // ObservEng: Observable<Employees[]>;
  workplan: Workplan[];
  current: Employees = JSON.parse(localStorage.getItem('currentUser'));
  errorMsg: string;

constructor(service: Service,private engineerService: EngineerService) {
    this.switchModeNames = ["Tabs", "Drop-Down Menu"];

    this.appointmentsData = service.getAppointments();
    this.resourcesData = service.getResources();


}

ngOnInit () {
  this.GetcurrentWorkplan();
}

GetcurrentWorkplan() {
  // console.log(this.current);
  this.ObservWork = this.engineerService.GetcurrentWorkplan(this.current.em_id);
  this.ObservWork.subscribe(
    workplan => {
      this.workplan = workplan;
    },
    err => {
      this.errorMsg = <any>err;
    }
  )
}


}

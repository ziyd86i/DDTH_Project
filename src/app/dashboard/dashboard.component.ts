import { Component, OnInit, ViewChild } from '@angular/core';
import { Workplan } from '../workplan';
import { Employees } from '../employees';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from './dashboard.service';
import { DayPilotSchedulerComponent, DayPilot } from "daypilot-pro-angular";
import { DatePipe, SlicePipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("scheduler")
  scheduler: DayPilotSchedulerComponent;

  ObservWork: Observable<Workplan[]>;
  ObservEmp: Observable<Employees[]>;
  workplan: Workplan[];
  errorMsg: string;
  DefaultTeam: number;
  teamName: string;
  currentUser: Employees;
  events = [];
  resource = [];
  config: any = {
    rowHeaderColumns: [
      { title: "<center> Engineer </center>" }
    ],
    timeHeaders: [
      { groupBy: "Month", format: "MMMM/yyyy" },
      { groupBy: "Day", format: "dddd d" },
    ],
    cellWidth: 135,
    eventHeight: 50,
    scale: "Day",
    days: 10,
    startDate: new Date(),

  };

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.DefaultTeam = this.currentUser.team_id;
    console.log(this.DefaultTeam)
    setInterval( () => {

      // window.location.reload();
      console.log("RELOAD")
    },60000)
  }

  ngOnInit() {
    this.getUser();
    this.getWorkplan();
    // console.log("GET WORK")
  }

  getUser() {
    this.ObservEmp = this.dashboardService.getUser(this.DefaultTeam)
    this.ObservEmp.subscribe(
      emp => {

        $(document).ready((data) => {
          data = emp
          console.log(data)
          this.teamName = data[0].team_name;
          // console.log(data)
          var dp = this.scheduler.control;


          for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);

            var user = {
              id: data[i].em_id,
              name: data[i].name + " " + data[i].lname
            }
            // console.log(user)
            this.resource.push(user);

          }
          console.log(this.resource)
          dp.resources = this.resource;
          dp.update();

        })
      },
      err => {
        this.errorMsg = <any>err
      }
    )
  }

  getWorkplan() {
    this.ObservWork = this.dashboardService.getWorkplan(this.DefaultTeam)
    this.ObservWork.subscribe(
      workplan => {
        this.workplan = workplan
        console.log(this.workplan)
        $(document).ready((data) => {
          data = this.workplan
          // console.log(data)
          var dp = this.scheduler.control;
          // var event = [];
          for (var i = 0; i < data.length; i++) {

            var date = this.datePipe.transform(data[i].date, "HH:mm")
            var end_date = this.datePipe.transform(data[i].end_date, "HH:mm")

            var item = {
              id: data[i].workplan_id,
              text: data[i].ticket_name + "<br>" + data[i].customer_name + "<br>" + date + " - " + end_date,
              // start: this.datePipe.transform(data[i].date, 'yyyy-MM-dd'),
              // end: this.datePipe.transform(data[i].end_date,'yyyy-MM-dd')
              resource: data[i].em_id,
              start: this.datePipe.transform(data[i].date, 'yyyy-MM-ddTHH:mm:ss'),
              end: this.datePipe.transform(data[i].end_date, 'yyyy-MM-ddTHH:mm:ss')

            }
            // console.log(item)
            var e = new DayPilot.Event(item)
            dp.events.add(e);
            // // console.log(dp.events.all())
            dp.update();

            // event.push(item);
            // this.events.push(item);
            // console.log(item)
          }
        })

      },
      err => {
        this.errorMsg = <any>err
      }
    )

  }

}

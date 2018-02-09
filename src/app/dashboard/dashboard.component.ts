import { Component, OnInit, ViewChild } from '@angular/core';
import { Workplan } from '../workplan';
import { Employees } from '../employees';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from './dashboard.service';
import { DayPilotSchedulerComponent, DayPilot } from "daypilot-pro-angular";
import { DatePipe, SlicePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
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
  currentTime:any;

  config: any = {
    rowHeaderColumns: [
      { title: "<center> Engineer </center>" }
    ],
    timeHeaders: [
      { groupBy: "Month", format: "MMMM/yyyy" },
      { groupBy: "Day", format: "dddd d" },
    ],
    headerHeight :30,
    cellWidth: 155,
    eventHeight: 75,
    scale: "Day",
    days: 10,
    startDate: new Date(),
    autoRefreshEnabled: true,
    autoRefreshInterval: 60,
    CssOnly: true,
    theme: "scheduler_theme",
    // CssClassPrefix: "dashboard_theme",

    onAutoRefresh: (args) => {
      this.scheduler.control.events.all().pop();
      this.getWorkplan();
      // this.scheduler.control.update();
      // console.log("refreshing, " + args.i)
    },
  };

  constructor(
     private dashboardService: DashboardService,
     private datePipe: DatePipe,
     private router: Router,
     private route: ActivatedRoute,) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.DefaultTeam = this.currentUser.team_id;
    this.currentTime = new Date().getDate()+1;

    setInterval( () => {
      var today = new Date().getDate();

      if(today === this.currentTime) {
        window.location.reload();
        console.log("RELOAD")
      }
    },60000 )
  }

  ngOnInit() {
    console.log(new Date())
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
          // console.log(data)
          this.teamName = data[0].team_name;
          // console.log(data)
          var dp = this.scheduler.control;
          var row = Math.ceil(data.length /10);
          // console.log(row)
          dp.treeEnabled = true;

          var col = 0;

          for(var r = 0; r< row; r++) {

            var eng = [];
            for (var i = 0; i < 10; i++) {
              // console.log(data[i]);

              if(col < data.length) {
                var user = {
                  id: data[col].em_id,
                  name: data[col].name + " " + data[col].lname
                }
                // console.log(user)
                eng.push(user);
                col++

              }
              else {
                break;

              }
              // console.log(eng)

            }
            // console.log(eng)
           var group = {
                name: "Group ["+(r+1)+"]",
                id: "group"+(r+1),
                expanded: false,
                children: eng
              }
          //  console.log(group)
            this.resource.push(group);
            // console.log(this.resource)

          }
          dp.resources = this.resource;
          dp.update();
          dp.rows.find("group1").expand();
                    // dp.rows.expandAll();


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
        // console.log(this.workplan)
        $(document).ready((data) => {
          data = this.workplan
          // console.log(data)
          var dp = this.scheduler.control;
          dp.events.list = [];
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

  backToHome() {
    if (this.currentUser.type === 'resource controller') {
        this.router.navigateByUrl('/cm');
    }
    else if (this.currentUser.type === 'admin') {
       this.router.navigateByUrl('/admin');
    }
  }

}

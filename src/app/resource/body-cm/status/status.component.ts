import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Employees } from '../../../employees';
import { Workplan } from '../../../workplan';
import { ResourceService } from '../../resource.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe, SlicePipe } from '@angular/common';
import { DoneDialog } from './done-dialog/done-dialog.component';
import { AssignDialog } from './assign-dialog/assign-dialog.component';
import { DelDialog } from './del-dialog/del-dialog.component';
import { DescDialog } from './desc-dialog/desc-dialog.component';
import { SchedulerDialog } from './scheduler-dialog/scheduler-dialog.component';
declare var $ :any;


@Component({
  selector: 'status-en',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();

  employees: Employees[];
  progress: Employees[];
  busy: Employees[];
  cmObservable: Observable<Employees[]>;
  errorMsg: string;
  defaultTeam:number;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));


  constructor(
              public dialog: MdDialog,
              private resourceService: ResourceService
            ) {
     setInterval(()=> {
     this.changeDefault();
     console.log("reload")
     },60000);
   }

  ngOnInit() {
    this.defaultTeam = this.currentUser.team_id;
    this.getAvailable();
    this.getInProgress();
    this.getBusy();

  }

  changeDefault() {

    $('#available').DataTable().destroy();
    $('#progress').DataTable().destroy();
    $('#busy').DataTable().destroy();

    this.getAvailable();
    this.getInProgress();
    this.getBusy();

  }

  getAvailable() {
    console.log(this.defaultTeam);
    this.cmObservable = this.resourceService.getAvailable(this.defaultTeam)
    this.cmObservable.subscribe(
      data => {
        this.employees = data;
        // this.dtTrigger.next();

          $(document).ready( () => {
            var table1 = $('#available').DataTable({

                  "language": {
                    "emptyTable": "No available data"
                  }
            });
          });

      },
      err => this.errorMsg = <any>err
    )
  }

  getInProgress() {
    this.cmObservable = this.resourceService.getInProgress(this.defaultTeam)
    this.cmObservable.subscribe(
      data => {
        this.progress = data

        $(document).ready( () => {

          $('#progress').DataTable({
              "language": {
                "emptyTable": "No progress data"
              }
            });

        });

      },
      err => this.errorMsg = <any>err
    )
  }

  getBusy() {
    this.cmObservable = this.resourceService.getBusy(this.defaultTeam)
    this.cmObservable.subscribe(
      data => {
        this.busy = data

        $(document).ready( () => {
            $('#busy').DataTable({
              "language": {
                "emptyTable": "No busy data"
              }
            });
        });
      },
      err => this.errorMsg = <any>err
    )
  }



  assignWork(id) {
    console.log(id);
    let dialogRef = this.dialog.open(AssignDialog, {
      width: '500px',
      data: id
    });
  }

  Description(id) {
    let dialogRef = this.dialog.open(DescDialog, {
      width: '550px',
      data: id

    })
  }

  deleteWork(id,status) {
    console.log(id);

    let dialogRef = this.dialog.open(DelDialog, {
      width: '350px',
      data: {
        id: id,
        status: status
      }

    })
  }

  dialogWorkDone(id) {
    console.log(id)

    let dialogRef = this.dialog.open(DoneDialog, {
      width: '350px',
      data: id
    });

  }

  schedulerDialog(data) {
    console.log(data)

    let dialogRef = this.dialog.open(SchedulerDialog, {
      width: '1024px',
      data: data
    })
  }


}

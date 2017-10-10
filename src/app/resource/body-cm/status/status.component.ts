import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Employees } from '../../../employees';
import { ResourceService } from '../../resource.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe, SlicePipe } from '@angular/common';
import { DoneDialog } from './done-dialog/done-dialog.component';
import { AssignDialog } from './assign-dialog/assign-dialog.component';
import { DelDialog } from './del-dialog/del-dialog.component';
import { DescDialog } from './desc-dialog/desc-dialog.component';
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


  constructor(
              public dialog: MdDialog,
              private resourceService: ResourceService
            ) { }

  ngOnInit() {
    this.defaultTeam = 505;
    this.getAvailable();
    this.getInProgress();
    this.getBusy();

    setInterval(()=> {
       this.changeDefault();

     },60000);

  }

  changeDefault() {

    $('#available').DataTable().destroy();
    $('#progress').DataTable().destroy();
    $('#busy').DataTable().destroy();

    this.getAvailable();
    this.getInProgress();
    this.getBusy();
    // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.destroy();
    //   this.getAvailable();
    //   // this.dtTrigger.next();
    // })
    // this.tableCount = true;
    // console.log(e);
    // this.employees.splice(0,this.employees.length);
    // this.progress.splice(0,this.progress.length);
    // this.busy.splice(0,this.busy.length);
    // console.log(this.employees);
    // console.log(this.progress);
    // console.log(this.busy);
    // this.getAvailable();
    // this.getInProgress();
    // this.getBusy();
  }

  getAvailable() {
    console.log(this.defaultTeam);
    this.cmObservable = this.resourceService.getAvailable(this.defaultTeam)
    this.cmObservable.subscribe(
      data => {
        this.employees = data;
        // this.dtTrigger.next();
        // var that = this;
        // var count = that.tableCount;

          // console.log(count);
          $(document).ready( () => {
            var table1 = $('#available').DataTable({
                  "language": {
                    "emptyTable": "No available data"
                  }
            });

            $('#available tbody').on('click', 'tr', () => {
              if ($(this).hasClass('selected')) {
                  $(this).removeClass('selected');
              }
              else {
                table1.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
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

  deleteWork(id) {
    console.log(id);
    let dialogRef = this.dialog.open(DelDialog, {
      width: '350px',
      data: id

    })
  }

  dialogWorkDone(id) {
    console.log(id)

    let dialogRef = this.dialog.open(DoneDialog, {
      width: '350px',
      data: id
    });

  }


}

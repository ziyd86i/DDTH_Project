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

  constructor(
              public dialog: MdDialog,
              private resourceService: ResourceService
            ) { }

  ngOnInit() {
    this.getAvailable();
    this.getInProgress();
    this.getBusy();
  }

  getAvailable() {
    this.cmObservable = this.resourceService.getAvailable()
    this.cmObservable.subscribe(
      data => {
        this.employees = data
        // this.dtTrigger.next();
        $(document).ready(function() {
          $('#available').DataTable({

          });
        });

      },
      err => this.errorMsg = <any>err
    )
  }

  getInProgress() {
    this.cmObservable = this.resourceService.getInProgress()
    this.cmObservable.subscribe(
      data => {
        this.progress = data
        $(document).ready(function() {
          $('#progress').DataTable({

          });
        });

      },
      err => this.errorMsg = <any>err
    )
  }

  getBusy() {
    this.cmObservable = this.resourceService.getBusy()
    this.cmObservable.subscribe(
      data => {
        this.busy = data
        $(document).ready(function() {
          $('#busy').DataTable({

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

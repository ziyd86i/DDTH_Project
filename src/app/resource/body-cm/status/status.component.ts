import { Component, OnInit, ViewChild } from '@angular/core';
import { Employees } from '../../../employees';
import { ResourceService } from '../../resource.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe, SlicePipe } from '@angular/common';
declare var $ :any;

@Component({
  selector: 'status-en',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions1: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtOptions3: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger3: Subject<any> = new Subject();

  employees: Employees[];
  progress: Employees[];
  busy: Employees[];
  cmObservable: Observable<Employees[]>;
  errorMsg: string;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.getAvailable();
    this.getInProgress();
  }

  getAvailable() {
    this.cmObservable = this.resourceService.getAvailable()
    this.cmObservable.subscribe(
      data => {
        this.employees = data
        this.dtTrigger1.next();


      },
      err => this.errorMsg = <any>err
    )
  }

  getInProgress() {
    this.cmObservable = this.resourceService.getInProgress()
    this.cmObservable.subscribe(
      data => {
        this.progress = data
        this.dtTrigger2.next();


      },
      err => this.errorMsg = <any>err
    )
  }

  getBusy() {
    this.cmObservable = this.resourceService.getBusy()
    this.cmObservable.subscribe(
      data => {
        this.busy = data
        this.dtTrigger3.next();


      },
      err => this.errorMsg = <any>err
    )
  }

}

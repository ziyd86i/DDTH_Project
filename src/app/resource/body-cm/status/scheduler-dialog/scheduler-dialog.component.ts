import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';
import { Employees } from '../../../../employees';
import { DatePipe, SlicePipe } from '@angular/common';
import { ResourceService } from '../../../resource.service';
import { MdDialog } from '@angular/material';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'scheduler-dialog',
  templateUrl: './scheduler-dialog.component.html',
  styleUrls: ['./scheduler-dialog.component.css']
})
export class SchedulerDialog implements OnInit {

  currentDate: Date = new Date();
  switchModeNames: string[];
  ObservableWork: Observable<Workplan>;
  workplan: Workplan = new Workplan();
  current: Employees = JSON.parse(localStorage.getItem('currentUser'));
  errorMsg: string;

  constructor(private resourceService: ResourceService,
              private datePipe: DatePipe,
              public dialogRef: MdDialogRef<SchedulerDialog>,
              @Inject(MD_DIALOG_DATA) public work_data: any) {

                this.switchModeNames = ["Tabs", "Drop-Down Menu"];


               }

  ngOnInit() {
    console.log(this.current)
    this.GetcurrentWorkplan();
  }

  GetcurrentWorkplan() {
    this.ObservableWork = this.resourceService.getWorkplanID(this.work_data.em_id)
    this.ObservableWork.subscribe(
      workplan => {
        this.workplan = workplan
      },
      err => {
        this.errorMsg = <any>err
      }
    )
  }
}

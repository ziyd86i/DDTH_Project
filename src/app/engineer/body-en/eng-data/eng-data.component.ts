import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../workplan';
import { Employees } from '../../../employees';
import { EngineerService } from '../../engineer.service';
import { DatePipe, SlicePipe } from '@angular/common';
import { NguiDatetime } from '@ngui/datetime-picker';
import { DialogDetails } from './dialog-detials/dialog-detials.component';
import { DialogDone } from './dialog-done/dialog-done.component';
@Component({
  selector: 'eng-data',
  templateUrl: './eng-data.component.html',
  styleUrls: ['./eng-data.component.css']
})
export class EngDataComponent implements OnInit {

  ObservableWork: Observable<Workplan[]>;
  ObservableWorking: Observable<Workplan>;
  index: number = 0;
  errorMsg: string;
  current: Employees = JSON.parse(localStorage.getItem('currentUser'));
  workplan: Workplan[];
  workofweek: Workplan[];
  workDoing: Workplan = new Workplan();

  // today: number = Date.now();

  constructor(public dialog: MdDialog,
    private engineerService: EngineerService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.GetworkToday();
    this.GetworkOfWeek();
    this.GetDoing();
  }

  GetworkToday() {
    console.log(this.current);
    this.ObservableWork = this.engineerService.GetworkToday(this.current.em_id);
    this.ObservableWork.subscribe(
      workplan => {
        this.workplan = workplan


      },
      err => this.errorMsg = <any>err

    )

  }

  GetworkOfWeek() {
    this.ObservableWork = this.engineerService.GetworkOfWeek(this.current.em_id);
    this.ObservableWork.subscribe(
      workplan => {
        this.workofweek = workplan
        console.log(this.workofweek);
      },
      err => this.errorMsg = <any>err

    )
  }

  GetDoing() {
    this.ObservableWorking = this.engineerService.GetDoing(this.current.em_id);
    this.ObservableWorking.subscribe(
      workplan => {
        this.workDoing = workplan[0];
        console.log(this.workDoing);
        // console.log(this.workDoing);
      },
      err => this.errorMsg = <any>err
    )
  }

  openDialogToday(id, index) {

    console.log(id);
    console.log(index);
    let dialogRef = this.dialog.open(DialogDetails, {
      width: '530px',
      data: {
        mydata: this.workplan[index],
        index: this.index,
        workplan_id: id
        // week: this.workofweek,
        // doing: this.workDoing,
      }
    });
  }

  dialogWorkDone(id) {
    console.log(id)

    let dialogRef = this.dialog.open(DialogDone, {
      width: '350px',
      data: id
    });

  }


}

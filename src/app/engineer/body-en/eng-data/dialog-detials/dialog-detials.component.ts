import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';
import { EngineerService } from '../../../engineer.service';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'dialog-detials',
  templateUrl: './dialog-detials.component.html',
  styleUrls: ['./dialog-detials.component.css']
})
export class DialogDetails implements OnInit {

  ObservableWork: Observable<Workplan>;
  DetailData: Workplan = new Workplan();
  index: number;
  workplan_id: number;
  errorMsg: string;
  constructor(private engineerService: EngineerService,
    public dialogRef: MdDialogRef<DialogDetails>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.DetailData = this.data.mydata;
    this.index = this.data.index;
    this.workplan_id = this.data.workplan_id;
    console.log(this.DetailData);
  }

  ConfirmWork () {
    console.log(this.workplan_id);
    this.ObservableWork = this.engineerService.ConfirmUpdate(this.workplan_id);
    this.ObservableWork.subscribe(
                      workplan => {
                        this.DetailData = workplan
                        this.dialogRef.close();
                      },
                      err => {
                        this.errorMsg = <any>err
                      }
    )
    this.dialogRef.close();
    window.location.reload();
  }

  CancelWork() {
    this.dialogRef.close();
  }
}

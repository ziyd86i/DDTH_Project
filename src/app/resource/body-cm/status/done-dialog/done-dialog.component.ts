import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ResourceService } from '../../../resource.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';

@Component({
  selector: 'done-dialog',
  templateUrl: './done-dialog.component.html',
  styleUrls: ['./done-dialog.component.css']
})
export class DoneDialog implements OnInit {

  ObservableWork: Observable<Workplan>;
  work_id: number;
  errorMsg: string;

  constructor(private resourceService: ResourceService,
      public dialogRef: MdDialogRef<DoneDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.work_id = this.data;
  }

  Done() {
    this.ObservableWork = this.resourceService.doneWork(this.work_id);
    this.ObservableWork.subscribe(
        workdone => {

        },
        err => {
        this.errorMsg = <any>err
        }
    )
    this.dialogRef.close();
    window.location.reload();

  }
  
  Cancel(){
    this.dialogRef.close();
  }

}

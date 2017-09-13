import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { EngineerService } from '../../../engineer.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';

@Component({
  selector: 'dialog-done',
  templateUrl: './dialog-done.component.html',
  styleUrls: ['./dialog-done.component.css']
})
export class DialogDone implements OnInit {

  ObservableWork: Observable<Workplan>;
  workplan_id: number;
  errorMsg: string;

  constructor(private engineerService: EngineerService,
    public dialogRef: MdDialogRef<DialogDone>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.workplan_id = this.data;
  }

  Done() {
    this.ObservableWork = this.engineerService.doneWork(this.workplan_id);
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

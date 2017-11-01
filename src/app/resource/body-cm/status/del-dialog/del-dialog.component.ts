import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ResourceService } from '../../../resource.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';

@Component({
  selector: 'del-dialog',
  templateUrl: './del-dialog.component.html',
  styleUrls: ['./del-dialog.component.css']
})
export class DelDialog implements OnInit {

  ObservableWork: Observable<Workplan>;
  work_id: number;
  status: string;
  errorMsg: string;

  constructor(private resourceService: ResourceService,
      public dialogRef: MdDialogRef<DelDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.work_id = this.data.id;
    this.status = this.data.status;
  }

  Delete() {
    console.log(this.work_id);
    this.ObservableWork = this.resourceService.deleteWork(this.work_id, this.status);
    this.ObservableWork.subscribe(
        work => {

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

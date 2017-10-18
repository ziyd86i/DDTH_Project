import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ResourceService } from '../../../resource.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';

@Component({
  selector: 'app-desc-dialog',
  templateUrl: './desc-dialog.component.html',
  styleUrls: ['./desc-dialog.component.css']
})
export class DescDialog implements OnInit {

  ObservableWork: Observable<Workplan>;
  workplan: Workplan = new Workplan();
  errorMsg: string;

  constructor(private resourceService: ResourceService,
      public dialogRef: MdDialogRef<DescDialog>,
      @Inject(MD_DIALOG_DATA) public work_id: any) { }

  ngOnInit() {
    this.getDetails()

  }

  ConfirmWork () {
    console.log(this.work_id);
    this.ObservableWork = this.resourceService.ConfirmUpdate(this.work_id);
    this.ObservableWork.subscribe(
                      workplan => {
                        this.workplan = workplan
                      },
                      err => {
                        this.errorMsg = <any>err
                      }
    )
    this.dialogRef.close();
    window.location.reload();
  }

  getDetails() {
    this.ObservableWork = this.resourceService.getDetails(this.work_id);
    this.ObservableWork.subscribe(
                      data => {
                        this.workplan = data[0]
                      },
                      err => {
                        this.errorMsg = <any>err
                      }
    )
  }

  close() {
    this.dialogRef.close();
  }



}

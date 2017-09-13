import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'eng-dialog',
  templateUrl: './eng-dialog.component.html',
  styleUrls: ['./eng-dialog.component.css']
})
export class EngDialogComponent implements OnInit {


  constructor(public dialogRef: MdDialogRef<EngDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.dialogRef.close('confirm');

  }

  onCloseCancel() {
    this.dialogRef.close('cancel');
  }

}

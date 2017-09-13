import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import { EngDialogComponent } from './eng-dialog/eng-dialog.component';

@Component({
  selector: 'eng-workplan',
  templateUrl: './eng-workplan.component.html',
  styleUrls: ['./eng-workplan.component.css']
})
export class EngWorkplanComponent implements OnInit {

  dialogResult: string;
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EngDialogComponent, {
      height: '350px',
      data: 'Text demo'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.dialogResult = result;
    });
  }

}

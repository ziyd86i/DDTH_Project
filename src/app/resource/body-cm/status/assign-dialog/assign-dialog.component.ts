import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ResourceService } from '../../../resource.service';
import { TicketService } from '../../../ticket/ticket.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';
import { Ticket } from '../../../ticket/ticket';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialog implements OnInit {

  ObservableWork: Observable<Workplan>;
  ObservableTicket: Observable<Ticket[]>;
  ticket: Ticket[];
  workplan:Workplan = new Workplan();
  selectTicket: string;
  em_id: string;
  errorMsg: string;

  constructor(
      private resourceService: ResourceService,
      private ticketService: TicketService,
      public dialogRef: MdDialogRef<AssignDialog>,
      @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.em_id = this.data;
    this.getTicket();
  }

  getTicket() {
    this.ObservableTicket = this.ticketService.getTicketState1();
    this.ObservableTicket.subscribe(
      ticket => {
        this.ticket = ticket;
      },
      err => {
        this.errorMsg = <any>err;
      }
    )
  }

  AssignWork(id) {
    console.log(id);
    console.log(this.em_id);
    this.workplan.em_id = this.em_id;
    this.workplan.ticket_id = id;
    // console.log(this.workplan);
    this.ObservableWork = this.resourceService.AssignWork(this.workplan)
    this.ObservableWork.subscribe(
      data => {

      },
      err => {
        this.errorMsg = <any>err
      }
    )
    this.dialogRef.close();
    window.location.reload();
  }



}

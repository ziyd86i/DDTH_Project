import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { TicketService } from '../../ticket.service';
import { ResourceService } from '../../../resource.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';
import { Employees } from '../../../../employees';

import { Ticket } from '../../../ticket/ticket';



@Component({
  selector: 'app-assign-eng',
  templateUrl: './assign-eng.component.html',
  styleUrls: ['./assign-eng.component.css']
})
export class AssignEngDialog implements OnInit {

  ObservAssign: Observable<Workplan>;
  ObservUser: Observable<Employees[]>;
  defaultTeam: number;
  selectEng: string;
  users: Employees[];
  workplan: Workplan = new Workplan();
  errorMsg: string;

  constructor(
              private resourceService: ResourceService,
              private ticketService: TicketService,
              public dialogRef: MdDialogRef<AssignEngDialog>,
  @Inject(MD_DIALOG_DATA) public ticket: any) { }

  ngOnInit() {

  }

  getEngineer() {
    this.ObservUser = this.ticketService.getEngineer(this.defaultTeam)
    this.ObservUser.subscribe(
      user => {
        this.users = user
      },
      err => {
        this.errorMsg = <any>err
      })
  }

  AssignWork() {
    this.workplan.em_id = this.selectEng;
    this.workplan.ticket_id = this.ticket.ticket_id;

    this.ObservAssign = this.resourceService.AssignWork(this.workplan)
    this.ObservAssign.subscribe(
      workplan => {
        this.workplan = workplan
      },
      err => {
        this.errorMsg = <any>err
      })
      this.dialogRef.close();
      window.location.reload();
  }

}

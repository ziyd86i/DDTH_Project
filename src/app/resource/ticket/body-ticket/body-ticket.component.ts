import { Component, OnInit,ViewChild } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import { Observable } from 'rxjs/Observable';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe,SlicePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { MdDialog } from '@angular/material';
import { AssignEngDialog } from './assign-eng/assign-eng.component';

@Component({
  selector: 'body-ticket',
  templateUrl: './body-ticket.component.html',
  styleUrls: ['./body-ticket.component.css']
})
export class BodyTicketComponent implements OnInit {

  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();
  mapping: string;
  ObservableTicket : Observable<Ticket[]>;
  ticket : Ticket[];
  progress: Ticket[];
  doing: Ticket[];
  done: Ticket[];

  constructor(  public dialog: MdDialog,
                private ticketService:TicketService,
                private router: Router,
                private datePipe: DatePipe) { }

  ngOnInit() {
    this.getTicket();
    this.getProgressTicket();
    this.getDoingTicket();
    this.getDoneTicket();
  }

  redirect() {
    this.router.navigateByUrl('/cm/ticket');
    window.location.reload();
  }

  getTicket() {
    this.ObservableTicket = this.ticketService.getTicketState1();
    this.ObservableTicket.subscribe(
              ticket => {
                this.ticket = ticket
                console.log("Ticket "+this.ticket)
                // this.dtTrigger.next();
                $(document).ready( () => {
                  $('#ticket').DataTable({
                    "language": {
                      "emptyTable": "No ticket right now"
                    }
                  });
                });
              },
              err => this.ticket = <any>err
  );
 }

 getProgressTicket() {
   this.ObservableTicket = this.ticketService.getTicketProgress();
   this.ObservableTicket.subscribe(
     ticket => {
       this.progress = ticket
       console.log("Progress " + this.progress)
       $(document).ready( () => {
         $('#ticket2').DataTable({
           "language": {
             "emptyTable": "No ticket in progress right now"
           }
         });
       });
     },
     err => this.ticket = <any>err
   )
 }

 getDoingTicket() {
   this.ObservableTicket = this.ticketService.getDoing();
   this.ObservableTicket.subscribe(
     ticket => {
       this.doing = ticket
       // console.log(this.doing)

       $(document).ready( () => {
         $('#ticket3').DataTable({
           "language": {
             "emptyTable": "No ticket doing right now"
           }
         });
       })
     },
     err => this.ticket = <any>err

   )
 }

 getDoneTicket() {
   this.ObservableTicket = this.ticketService.getDone();
   this.ObservableTicket.subscribe(
     ticket => {
       this.done = ticket
       $(document).ready( () => {
         $('#ticket4').DataTable({
           "language": {
             "emptyTable": "Not have finished ticket"
           }
         });
       })
     },
     err => this.ticket = <any>err

   )
 }

 deleteTicket(ticket) {

   if (confirm("Do you want to delete this ticket ?")) {

       this.ticketService.deleteTicket(ticket.ticket_id)
          .subscribe(null,
          err => {
            alert("Cannot Delete this ticket");
          });
   }
 }

 deleteTicketDone(ticket) {

   console.log(ticket);
   if (confirm("Warning !! This ticket is already assign to engineer. Their workplan must me delete in the same time.")) {

     this.ticketService.deleteAll(ticket.ticket_id)
       .subscribe(null,
         err => {
           alert("Could not delete ticket.");
           // Revert the view back to its original state
         });
        //  this.redirect();
   }
 }

 assignWork(ticket, name) {
   console.log(ticket)
   let dialogRef = this.dialog.open(AssignEngDialog, {
     width: '500px',
     data: {
       ticket_id:ticket,
       ticket_name: name
     }
   });
 }


}

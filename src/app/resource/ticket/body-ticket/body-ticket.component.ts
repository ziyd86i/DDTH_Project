import { Component, OnInit,ViewChild } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import { Observable } from 'rxjs/Observable';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe,SlicePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'body-ticket',
  templateUrl: './body-ticket.component.html',
  styleUrls: ['./body-ticket.component.css']
})
export class BodyTicketComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  ObservableTicket : Observable<Ticket[]>;
  ticket : Ticket[];

  constructor(
                private ticketService:TicketService,
                private router: Router,
                private datePipe: DatePipe) { }

  ngOnInit() {
    this.getTicket();
  }

  redirect() {
    this.router.navigateByUrl('/cm/ticket');
    window.location.reload();
  }

  getTicket() {
    this.ObservableTicket = this.ticketService.getTicket();
    this.ObservableTicket.subscribe(
              ticket => {
                this.ticket = ticket
                this.dtTrigger.next();
              },
              err => this.ticket = <any>err


  );
 }

 deleteTicket(ticket) :void {

   console.log(ticket);
   if (confirm("Are you sure you want to delete this ticket ?")) {

     this.ticketService.deleteTicket(ticket.ticket_id)
       .subscribe(null,
         err => {
           alert("Could not delete user.");
           // Revert the view back to its original state
         });
        //  this.redirect();
   }
 }


}

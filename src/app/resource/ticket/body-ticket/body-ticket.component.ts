import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import { Observable } from 'rxjs/Observable';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'body-ticket',
  templateUrl: './body-ticket.component.html',
  styleUrls: ['./body-ticket.component.css']
})
export class BodyTicketComponent implements OnInit {

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

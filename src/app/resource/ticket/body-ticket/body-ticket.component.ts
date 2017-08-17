import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'body-ticket',
  templateUrl: './body-ticket.component.html',
  styleUrls: ['./body-ticket.component.css']
})
export class BodyTicketComponent implements OnInit {

  ObservableTicket : Observable<Ticket[]>;
  ticket : Ticket[];

  constructor(private ticketService:TicketService) { }

  ngOnInit() {
    this.getTicket();
  }

  getTicket() {
    this.ObservableTicket = this.ticketService.getTicket();
    this.ObservableTicket.subscribe(
              employees => this.ticket = employees,
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
   }
 }


}

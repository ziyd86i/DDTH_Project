import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import * as $ from 'jquery';




@Component({
  selector: 'form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.css']
})
export class FormTicketComponent implements OnInit {

  form : FormGroup;
  title : string;
  submitted = false;
  editted = false;
  tickets : Ticket = new Ticket();
  errorMsg: string;

  ManagedTicket :Observable<Ticket>;


  constructor(
     formBuilder: FormBuilder,
     private router: Router,
     private route: ActivatedRoute,
     private ticketService: TicketService

 ) {
   this.form = formBuilder.group({
     ticket_id: ['', [
       Validators.required,

     ]],
     owner: ['', [
       Validators.required,
     ]],
     customer_name: ['', [
       Validators.required,
     ]],
     tel: ['', [
       Validators.required,
     ]],
     description: ['', [
       Validators.required,
     ]]



   });
 }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      console.log(id);

      this.title = id ? 'Edit Ticket': 'Add Ticket';

      if(id) {
        this.getDataById(id);

      }

    });
  }

  redirect() {
    this.router.navigateByUrl('/cm/ticket');
    window.location.reload();
  }

  managedTicket() {
    if(this.editted) { this.editTicket(this.form); }
    else if(!this.editted) { this.addTicket(this.form); }
  }


    getDataById(id) {

      this.ManagedTicket = this.ticketService.getTicketById(id)
        this.ManagedTicket.subscribe(
        ticket => {
          console.log(ticket),
          this.tickets = ticket[0];
        },
        err => this.errorMsg = <any>err
      );

      this.editted = true;


    }



  addTicket(form) {

        console.log("Submitted success!");
        form.value.state = 1;
        console.log(form.value);
        this.ManagedTicket = this.ticketService.addTicket(form.value)
        this.ManagedTicket.subscribe(
          users => {
            this.tickets = users;
          },
          err =>  this.errorMsg = <any>err
        );

        this.redirect();

  }

  editTicket(form) {
    console.log("This is the edit function !!!");
    console.log(form.value);
    this.ManagedTicket = this.ticketService.editTicket(form.value, form.value.ticket_id)
    this.ManagedTicket.subscribe(
      users => {
        this.tickets = users;

      },
      err =>  this.errorMsg = <any>err
    );
    this.redirect();
  }

}

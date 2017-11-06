import { Component, OnInit, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import * as $ from 'jquery';
import config from 'devextreme/core/config'
// import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

declare var jQuery: any;

@Component({
  selector: 'form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.css'],

})
export class FormTicketComponent implements OnInit {

  form: FormGroup;
  title: string;
  submitted = false;
  editted = false;
  tickets: Ticket = new Ticket();
  errorMsg: string;
  date: Date = new Date();


  // date2: Date = new Date(2016, 5, 10);
  // datepickerOpts = {
  //   startDate: new Date(2016, 5, 10),
  //   autoclose: true,
  //   todayBtn: 'linked',
  //   todayHighlight: true,
  //   assumeNearbyYear: true,
  //   format: 'D, d MM yyyy'
  // }

  ManagedTicket: Observable<Ticket>;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private datePipe: DatePipe

  ) {
    config({
      forceIsoDateParsing: true
    });

    this.form = formBuilder.group({
      ticket_name: new FormControl({value: '', disabled:false}, Validators.required),
      so_number: ['',[

      ]],
      owner: ['', [

      ]],
      person_contact: ['',[

      ]],
      customer_name: new FormControl({value: '', disabled:false}, Validators.required),
      tel: ['',[
        Validators.maxLength(10),
        Validators.pattern('[0][0-9]{8,9}')
      ]],
      description: ['',[

      ]],
      date: [new Date(), [
        Validators.required
      ]],
      end_date:[new Date(), [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      console.log(id);

      this.title = id ? 'Edit Ticket' : 'Add Ticket';

      if (id) {
        this.getDataById(id);

      }

    });

  }

  redirect() {
    this.router.navigateByUrl('/cm/ticket');
    window.location.reload();
  }

  managedTicket() {
    if (this.editted) { this.editTicket(this.form); }
    else if (!this.editted) { this.addTicket(this.form); }
  }


  getDataById(id) {

    // console.log(this.form.controls['so_number'].valid)
    // console.log(this.form.controls['owner'].valid)
    // console.log(this.form.controls['person_contact'].valid)
    // console.log(this.form.controls['customer_name'].valid)
    // console.log(this.form.controls['tel'].valid)
    // console.log(this.form.controls['description'].valid)


    this.ManagedTicket = this.ticketService.getTicketById(id)
    this.ManagedTicket.subscribe(
      ticket => {
        console.log(ticket),
          this.tickets = ticket[0];

        this.tickets.date = this.datePipe.transform(this.tickets.date, 'yyyy-MM-dd HH:mm');
        this.tickets.end_date = this.datePipe.transform(this.tickets.end_date, 'yyyy-MM-dd HH:mm');
      },
      err => this.errorMsg = <any>err
    );

    this.editted = true;


  }



  addTicket(form) {

    console.log("Submitted success!");
    form.value.state = 'active';
    form.value.date = this.datePipe.transform(form.value.date, 'yyyy-MM-dd HH:mm');
    form.value.end_date = this.datePipe.transform(form.value.end_date, 'yyyy-MM-dd HH:mm');
    // form.value.time = form.value.time.toString();
    console.log(form.value);
    this.ManagedTicket = this.ticketService.addTicket(form.value)
    this.ManagedTicket.subscribe(
      users => {
        this.tickets = users;
      },
      err => this.errorMsg = <any>err
    );

    this.redirect();

  }

  editTicket(form) {
    console.log("This is the edit function !!!");
    console.log(form.value);

    form.value.ticket_id = this.tickets.ticket_id;
    form.value.date = form.value.date.toString();
    form.value.end_date = form.value.end_date.toString();

    this.ManagedTicket = this.ticketService.editTicket(form.value, form.value.ticket_id)
    this.ManagedTicket.subscribe(
      users => {
        this.tickets = users;

      },
      err => this.errorMsg = <any>err
    );
    this.redirect();
  }

  changeEndDate(time) {
    console.log(time.value)
    this.tickets.end_date = this.datePipe.transform(new Date(time.value).getTime() + 60*1000*180, 'yyyy-MM-ddTHH:mm:ss')
  }

}

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'body-ticket',
  templateUrl: './body-ticket.component.html',
  styleUrls: ['./body-ticket.component.css']
})
export class BodyTicketComponent implements OnInit {

  constructor(private http:Http) { }

  ngOnInit() {
  }

}

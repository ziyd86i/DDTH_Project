import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'body-cm',
  templateUrl: './body-cm.component.html',
  styleUrls: ['./body-cm.component.css']
})
export class BodyCmComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

}

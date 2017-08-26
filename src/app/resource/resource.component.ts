import { Component, OnInit } from '@angular/core';
import { Employees } from '../employees';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})

export class ResourceComponent implements OnInit {
  currentUser: Employees;
  constructor() {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.currentUser);
  }

  ngOnInit() {
  }

}

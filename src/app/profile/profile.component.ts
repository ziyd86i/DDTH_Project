import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Employees } from '../employees';
import { ProfileService } from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: Employees;

  constructor(
      private router: Router,
      private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       }

  ngOnInit() {

  }



}

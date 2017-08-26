import { Component, OnInit } from '@angular/core';
import { Employees } from '../../employees';
import { AuthenticationService } from '../../login/_service/authentication.service';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'header-eng',
  templateUrl: './header-en.component.html',
  styleUrls: ['./header-en.component.css']
})
export class HeaderEnComponent implements OnInit {
  currentUser: Employees;
  constructor(private authenService:AuthenticationService,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(this.currentUser);
  }

  ngOnInit() {
  }

  logout() {
    console.log("here is logout");
    this.authenService.logout();
    this.router.navigate(['/']);
  }
}

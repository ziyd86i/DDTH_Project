import { Component, OnInit } from '@angular/core';
import { Employees } from '../../employees';
import { AuthenticationService } from '../../login/_service/authentication.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

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

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Router, ActivatedRoute } from '@angular/router';
//
// import { AlertService, AuthenticationService } from './_service/index';

import { ServiceService } from '../service.service';
import { Employees } from '../employees';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ObservableEmp: Observable<Employees[]>
  employees: Employees[];
  errorMsg: string;

  constructor(private employeeService: ServiceService) { }
  ngOnInit(): void {
    this.ObservableEmp = this.employeeService.getEmployees();
    this.ObservableEmp.subscribe(
      employees => this.employees = employees,
      err => this.errorMsg = <any>err
    );
  }
  //   model: any= {};
  //   loading = false;
  //   returnUrl: string;
  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private authenticationService: AuthenticationService,
  //   private alertService: AlertService) { }
  //
  //   ngOnInit() {
  //         // reset login status
  //         this.authenticationService.logout();
  //
  //         // get return url from route parameters or default to '/'
  //         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  //     }

      // login() {
      //     this.loading = true;
      //     this.authenticationService.login(this.model.username, this.model.password)
      //         .subscribe(
      //             data => {
      //                 this.router.navigate([this.returnUrl]);
      //             },
      //             error => {
      //                 this.alertService.error(error);
      //                 this.loading = false;
      //             });
      // }

}

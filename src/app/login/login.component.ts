import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from './_service/index';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Employees } from '../employees';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  remember : boolean = false;
  returnUrl: string;

  ObservableEmp: Observable<Employees[]>
  employees: Employees;
  errorMsg: string;
  username: any;
  password: any;

  constructor(
              private authenService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) { }


  ngOnInit() {

    //reset login status
    this.authenService.logout();
    // console.log(this.username.valid)
    //get return url from  route  params or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   }

   login() {
     this.loading = true;
     console.log(this.username, this.password);
     this.authenService.login(this.username, this.password)
         .subscribe(
           users => {
             if(!users.success){
                this.loading = false;

               this.errorMsg = users.message;

             }
             else if(users.success) {
               this.employees = users;
               console.log(this.employees.type);
               if(this.employees.type === 'admin') {
                 this.router.navigate(['/admin']);
               }
               else if(this.employees.type === 'resource controller') {
                 this.router.navigate(['/cm']);
               }
               else if(this.employees.type === 'engineer') {
                 this.router.navigate(['/eng']);
               }
             }

           },
           error => {
             this.alertService.error(error);
             this.loading = false;
           }
         );
   }


  //  private jwt() {
  //    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //    if(currentUser && currentUser.token) {
  //      let headers = new Headers({'Authorization':'DDTH'+ currentUser.token});
  //      return new RequestOptions({ headers: headers});
  //    }
  //  }


}

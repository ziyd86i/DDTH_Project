import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 import { Employees } from '../../employees';

@Injectable()
export class AuthCmGuard implements CanActivate {
    currentUser: Employees;


    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true

          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.currentUser);
          if (this.currentUser.type === 'resource controller') {

              return true;
          }
          else {
            window.alert("Please login as a Resource Controller.");
          }

            
        }
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;

 
        
        
    }
}

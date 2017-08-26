import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    userUrl = 'http://localhost:3300';

    login(username: string, password: string) {
      let body = JSON.stringify({username: username, password: password});
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers : headers});
      console.log(body);

        return this.http.post(`${this.userUrl}/api/authenticate`,body, options)
                        .map((res: Response) => {
                            // login successful if there's a jwt token in the response
                            let user = res.json();
                            console.log(user);
                            console.log(user.em_id, user.name, user.lname, user.token, user.type);
                            if (user && user.token) {
                              // store user details and jwt token in local storage to keep user logged in between page refreshes
                              localStorage.setItem('currentUser', JSON.stringify(user));
                            }

                            return user;
                          });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Workplan } from '../workplan';
import { Employees } from '../employees';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {

  constructor(private http:Http) { }

  // userUrl = 'http://10.35.2.31:3300';
  userUrl = 'http://localhost:3300';


  getWorkplan(team: Object): Observable<Workplan[]> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/dashboard/workplan/${team}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'get workplan error'));
  }

  getUser(team: Object): Observable<Employees[]> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/dashboard/user/${team}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'get user error'));
  }
}

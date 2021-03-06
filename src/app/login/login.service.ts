import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employees } from '../employees';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  // userUrl = 'http://10.35.2.31:3300';
  userUrl = 'http://localhost:3300';

  constructor(private http:Http ) { }

  //get users data จาก backend
  getEmployees(): Observable<Employees[]> {
    console.log("GET");
   return this.http.get(`${this.userUrl}/data`)
                    .map((res:Response) => res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));

  }
}

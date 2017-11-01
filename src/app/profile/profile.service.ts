import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employees } from '../employees';


@Injectable()
export class ProfileService {

  constructor(private http:Http) { }

  userUrl = 'http://localhost:3300';

  getUserById(id): Observable<Employees> {

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/profile/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'get data available error'));
  }

  editUserId(form: Object, em_id: Object): Observable<Employees> {
    console.log(form)
    console.log(em_id)
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.post(`${this.userUrl}/profile/edit/${em_id}`,form , options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'get data available error'));
  }
}

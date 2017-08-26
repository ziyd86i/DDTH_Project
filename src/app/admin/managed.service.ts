import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employees } from '../employees';

@Injectable()
export class ManagedService {

  constructor(private http: Http) { }

  userUrl = 'http://localhost:3300';

  getEmployees(): Observable<Employees[]> {
    console.log("GET");
   return this.http.get(`${this.userUrl}/data`)
                    .map((res:Response) => res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));

  }

  getUserById(id : Object): Observable<Employees> {
    console.log("GET" + id);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/data/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));

  }

  editUser(form: Object, id:Object): Observable<Employees> {
    console.log("EDIT" + form);
    console.log(id);
    let body = JSON.stringify(form);
    let bodyInt = JSON.stringify(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});
    console.log(body);

    return this.http.post(`${this.userUrl}/edit/${bodyInt}`, body, options)
                    .map((res: Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  addUser(form: Object): Observable<Employees> {
    console.log("POST" + form);
    let body = JSON.stringify(form);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});
    console.log(body);

    return this.http.post(`${this.userUrl}/adduser`, body, options)
                    .map((res:Response) => res.json())
                    .catch((err:any) => Observable.throw(err.json().error || 'Server Error'));

  }

  deleteUser(id): Observable<Employees> {
    console.log(id);


    return this.http.get(`${this.userUrl}/delete/${id}`)
                    .map((res: Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}

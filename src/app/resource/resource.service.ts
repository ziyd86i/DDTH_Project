import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employees } from '../employees';
import { Workplan } from '../workplan';


@Injectable()
export class ResourceService {

  constructor(private http:Http) { }

  userUrl = 'http://localhost:3300';

  getAvailable(team_id): Observable<Employees[]> {
    // console.log(team_id);
    console.log("Get available");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/available/${team_id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));

  }

  getInProgress(team_id) : Observable<Employees[]> {
    console.log("Get In progress");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/progress/${team_id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));

  }
  getBusy(team_id) : Observable<Employees[]> {
    console.log("Get Busy");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/busy/${team_id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));

  }

  AssignWork(data: Object): Observable<Workplan> {
    // console.log(data);
    // console.log(emp_id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(`${this.userUrl}/cm/assignwork`,data, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  doneWork(id: Object): Observable<Workplan> {
    // console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(`${this.userUrl}/eng/donework/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteWork(id: Object): Observable<Workplan> {
    // console.log(id);
    console.log("Delete work assign")
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/cm/delete/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  getDetails(id: Object): Observable<Workplan> {
    console.log("Getdata work");
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/cm/getdata/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  getWorkplanID(id: Object): Observable<Workplan> {
    console.log("Get workplan ID");
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/workplan/id/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetcurrentWorkplan(team: Object): Observable<Workplan[]> {
    console.log("Get all Workplan");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/workplan/${team}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  getDateSelect(month:Object, year:Object, team:number): Observable<Workplan[]> {
    console.log(month, year);
    let body = {month,year};
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.post(`${this.userUrl}/workplan/dateselect/${team}`,body , options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  ConfirmUpdate(index: Object): Observable<Workplan> {
    console.log(index);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(`${this.userUrl}/eng/accept/${index}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }
}

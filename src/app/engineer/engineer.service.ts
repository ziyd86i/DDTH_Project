import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Workplan } from '../workplan';

@Injectable()
export class EngineerService {

  userUrl = 'http://localhost:3300';

  constructor(private http:Http) { }

  GetworkToday(id: Object) : Observable<Workplan[]>{
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/eng/workplan/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));

  }

  GetworkOfWeek(id: Object) : Observable<Workplan[]> {
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/eng/workonweek/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetDoing(id: Object) : Observable<Workplan> {
    console.log(id)
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/eng/workdoing/${id}`, options)
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

  doneWork(id: Object): Observable<Workplan> {
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(`${this.userUrl}/eng/donework/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetcurrentWorkplan(id: Object): Observable<Workplan[]> {
    console.log(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/eng/workplan/get/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  addWorkplan(form: Object,em_id: Object): Observable<Workplan> {
    console.log(form)
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(`${this.userUrl}/eng/addwork/${em_id}`,form, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateWorkplan(form: Object): Observable<Workplan> {
    let body = JSON.stringify(form);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.post(`${this.userUrl}/eng/updatework`,body, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

  removeWork(id: Object): Observable<Workplan> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

    return this.http.get(`${this.userUrl}/eng/removework/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }

}

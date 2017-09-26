import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Ticket } from './ticket';
import { NguiDatetimePickerModule, NguiDatetime } from '@ngui/datetime-picker';

@Injectable()
export class TicketService {

  constructor(private http:Http) { }

  userUrl = 'http://localhost:3300';

  getTicket(): Observable<Ticket[]> {
    console.log("Get Ticket");
    return this.http.get(`${this.userUrl}/ticket`)
                    .map((res:Response) => res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server get ticket Error'));
  }

  getTicketState1(): Observable<Ticket[]> {
    console.log("Get Ticket State");
    return this.http.get(`${this.userUrl}/ticketstate`)
                    .map((res:Response) => res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server get ticket Error'));
  }

  getTicketById(id : Object): Observable<Ticket> {
      console.log("GET" + id);

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});

   return this.http.get(`${this.userUrl}/ticket/${id}`, options)
                    .map((res:Response) =>res.json())
                    .catch((error:Response|any) => Observable.throw(error.json().error || 'Server error'));
  }



  addTicket(form: Object): Observable<Ticket> {
    console.log("POST ticket ");
    console.log(form);

    let body = JSON.stringify(form);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});
    console.log(body);

    return this.http.post(`${this.userUrl}/ticket/add`, body, options)
                    .map((res:Response) => res.json())
                    .catch((err:any) => Observable.throw(err.json().error || 'Server Error'));

  }

  editTicket(form: Object, id:Object): Observable<Ticket> {
    console.log("EDIT  ticket " + form);
    console.log(id);
    let body = JSON.stringify(form);
    let bodyInt = JSON.stringify(id);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers : headers});
    console.log(body);

    return this.http.post(`${this.userUrl}/ticket/edit/${bodyInt}`, body, options)
                    .map((res: Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteTicket(id): Observable<Ticket> {
    console.log(id);
    return this.http.get(`${this.userUrl}/ticket/delete/${id}`)
                    .map((res: Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}

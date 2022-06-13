import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http :HttpClient) { }
  private baseUrl = 'http://localhost:8040/api/email';
  private baseUrl2 = 'http://localhost:8040/api/emailFrom';
  private baseUrl1 = 'http://localhost:8040/api/emailSign';

  enviarEmail(email :Object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, email);
  }

  enviarEmailFrom(email :Object): Observable<any> {
    return this.http.post(`${this.baseUrl2}`, email);
  }

  enviarEmail1(email :Object): Observable<any> {
    return this.http.post(`${this.baseUrl1}`, email);
  }
}

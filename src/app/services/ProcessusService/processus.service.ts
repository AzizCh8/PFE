import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessusService {
  private baseUrl = 'http://localhost:8040/processus/register';
  private host='http://localhost:8040/processus/';
  constructor(private http:HttpClient,private auth:AuthentificationService) { }
  
  public register(data:any):Observable<any>
{ 
  if(this.auth.jwtToken==null) this.auth.loadToken();
  
      return this.http.post(`${this.baseUrl}`,data,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
  
}

public getProcessus(name:String,page:number){
  if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.get(this.host+"processus?name_processus="+name+"&page="+page,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}


public getUsersByProcessusId(idP:number){
  return this.http.get(this.host+"usersByProcessusId?idP="+idP);
}
}

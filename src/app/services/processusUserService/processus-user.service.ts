import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessusUserService {
  private host='http://localhost:8040/processusUser/processusUserList';
  constructor(private http:HttpClient,private auth:AuthentificationService) { }

  public getProcessus(id:any){
    if(this.auth.jwtToken==null) this.auth.loadToken();
    return this.http.get(this.host+"?idP="+id,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
  }
}

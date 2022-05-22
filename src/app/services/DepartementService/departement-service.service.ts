import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementServiceService {
  host="http://localhost:8040";
  constructor(private http:HttpClient,private auth:AuthentificationService) { }

  public getDepartements1()
  {if(this.auth.jwtToken==null) this.auth.loadToken();
    console.log("eeeeee");
    return this.http.get(this.host+"/departements",{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
  }

  public getDepartementsByKeyword(mc:String,page:number,size:number){
    if(this.auth.jwtToken==null) this.auth.loadToken();
    return this.http.get(this.host+"/departements/search/byDepPage?mc="+mc+"&page="+page+"&size="+size,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
  }

  public getDepartments(page:number,size:number){
    if(this.auth.jwtToken==null) this.auth.loadToken();
      
      return this.http.get(this.host+"/departements?page="+page+"&size="+size,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
      
  }

  public getDepartement(url:any):Observable<any>
{if(this.auth.jwtToken==null) this.auth.loadToken();
  
  return this.http.get(url,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}

public getDepById(id:number){
  return this.http.get(this.host+"/depName/"+id);
}

public update(url:any,data:any)
{if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.put(url,data,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}
  public deleteDepartement(url:any):Observable<any>
{ if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.delete(url,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}

public saveDepartement(url:any,data:any):Observable<any>
{if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.post(url,data,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}


public updateDepartement(url:any,data:any)
{ if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.put(url,data,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}
}

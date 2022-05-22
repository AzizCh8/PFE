import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { AuthentificationService } from '../authentification/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ListeUtilisateursService {
  
  
  constructor(private http:HttpClient,private auth:AuthentificationService) { }
  private baseUrl = 'http://localhost:8040/register';
  host="http://localhost:8040";

  public getUtilisateurs()
  {if(this.auth.jwtToken==null) this.auth.loadToken();
    return this.http.get(this.host+"/users",{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
  }
  
  public getUsers(page:number,size:number){
    if(this.auth.jwtToken==null) this.auth.loadToken();
      return this.http.get(this.host+"/users?page="+page+"&size="+size);
  }
  
  public getUsersByKeyword(mc:String,page:number,size:number){
    if(this.auth.jwtToken==null) this.auth.loadToken();
    return this.http.get(this.host+"/users/search/byNamePage?mc="+mc+"&page="+page+"&size="+size,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}

public getUsersByKeyword1(mc:String,page:number,size:number){
 
  return this.http.get(this.host+"/users/search/byNamePage?mc="+mc+"&page="+page+"&size="+size);
}

public getUsers1(name:String,page:number){
  if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.get(this.host+"/username?username="+name+"&page="+page,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}

public findUser(email:String){
  return this.http.get(this.host+"/username1?username="+email);
}

public findUser1(email:String){
  return this.http.get(this.host+"/userId?username="+email);
}

public deleteUser(url:any):Observable<any>
{ if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.delete(url,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}

public deleteUser1(url:any):Observable<any>
{ 
  return this.http.delete(url);
}



public register(data:any):Observable<any>
{ 
  if(this.auth.jwtToken==null) this.auth.loadToken();
  
return this.http.post(`${this.baseUrl}`,data,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
  
}

public register1(data:any):Observable<any>
{ 
return this.http.post(`${this.baseUrl}`,data);
  
}

public find(data:any):Observable<any>
{ 
  return this.http.get(this.host+"/uss",data);
}
public saveUser(url:any,data:any):Observable<any>
{return this.http.post(url,data,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}

public getUser(url:any):Observable<any>
{ if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.get(url,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}



public update(url:any,data:any)
{ if(this.auth.jwtToken==null) this.auth.loadToken();
  return this.http.put(url,data,{headers:new HttpHeaders({'Authorization':this.auth.jwtToken})});
}

public update1(data:any)
{ 
  return this.http.put(this.host+"/updateUser",data);
}



}

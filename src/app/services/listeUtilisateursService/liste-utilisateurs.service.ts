import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ListeUtilisateursService {
  host="http://localhost:8040";
  constructor(private http:HttpClient) { }
    public getUsers(page:number,size:number){
      return this.http.get(this.host+"/users?page="+page+"&size="+size);
  }

  public getUsersByKeyword(mc:String,page:number,size:number){
    return this.http.get(this.host+"/users/search/byNamePage?mc="+mc+"&page="+page+"&size="+size);
}

public deleteUser(url:any):Observable<any>
{return this.http.delete(url);
}

public saveUser(url:any,data:any):Observable<any>
{return this.http.post(url,data);
}

public getUser(url:any):Observable<any>
{
  return this.http.get(url);
}

public update(url:any,data:any)
{
  return this.http.put(url,data);
}
}

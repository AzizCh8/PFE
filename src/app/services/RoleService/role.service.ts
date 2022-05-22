import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  host="http://localhost:8040";
  constructor(private http:HttpClient) { }


  public getRoles(page:number,size:number){
    return this.http.get(this.host+"/roles?page="+page+"&size="+size);
}

public getRolesJson(){
  return this.http.get(this.host+"/roles");
}

public getRolesByKeyword(mc:String,page:number,size:number){
  return this.http.get(this.host+"/roles/search/byRolePage?mc="+mc+"&page="+page+"&size="+size);
}

public deleteRole(url:any):Observable<any>
{return this.http.delete(url);
}

public saveRole(url:any,data:any):Observable<any>
{return this.http.post(url,data);
}

public getRole(url:any):Observable<any>
{
  return this.http.get(url);
}

public update(url:any,data:any)
{
  return this.http.put(url,data);
}





}
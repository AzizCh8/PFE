import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from 'src/app/models/Role/role';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public users=[
    {username:'ADMIN',password:'1234',roles:Role.USER},

  {username:'Aziz',password:'1234',roles:Role.USER},

  {username:'Ahmed',password:'1235',roles:Role.USER}
  ];
  public isAuthenticated!:Boolean;
  public userAuthenticated!:any;
  public jwtToken!:any;
  private host:String="http://localhost:8040";
  private role!:Array<any>;
  constructor(private http:HttpClient) { }

  public isLoggedIn()
  {
    return !!localStorage.getItem('token');
  }

  public login(user:any)
  {
    return this.http.post(this.host+"/login",user,{observe:'response'});
  }

  public loadToken()
  {
    this.jwtToken=localStorage.getItem('token');
    console.log("from load token "+this.jwtToken);
  }
  
  public saveToken(jwt:any)
  { this.jwtToken=jwt;
    localStorage.setItem('token',jwt);
    let jwtHelper=new JwtHelperService();
    console.log("hhhhhhhh");
    //let jwtHelper=new JwtHelper();
    this.role=jwtHelper.decodeToken(this.jwtToken).roles;
    localStorage.setItem('role',this.role[0].authority);
    console.log(this.role);
  }

  public logout()
  {
    this.jwtToken=null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem("user");
  }

  public isAdmin()
  { 
    let r=localStorage.getItem('role') ;
      if(r=="ADMIN")
      return true;
    
    return false;
  }
}

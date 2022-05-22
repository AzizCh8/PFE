import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(){
    let role=localStorage.getItem("role");
    if(role=="ADMIN"){
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
  
}

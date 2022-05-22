import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthentificationService,private router:Router)
  {

  }
  canActivate()
    {if(this.auth.isLoggedIn())
    return true;
    this.router.navigate(['/login']);
    return false;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:User;
  constructor(private router:Router,public auth:AuthentificationService,private utilisateurs:ListeUtilisateursService) { }

  ngOnInit(): void {
    const email=localStorage.getItem("user");
    this.utilisateurs.findUser(email).subscribe(
      (data:any)=>{
        console.log(data);
        this.user=data;
      }
    )
  }
  
  onLogout()
  {   this.auth.logout();
      this.router.navigateByUrl('/login');
  }



}

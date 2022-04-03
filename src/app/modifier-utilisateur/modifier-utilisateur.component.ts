import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user/user';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.css']
})
export class ModifierUtilisateurComponent implements OnInit {
  currentUser!:User;
  url!:String;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private utilisateurs:ListeUtilisateursService) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params['id']);
    this.utilisateurs.getUser(this.url).subscribe(data=>{this.currentUser=data;})
    console.log(this.url);
  }

  onUpdateUser(value:any)
  {
    this.utilisateurs.update(this.url,value).subscribe(data=>{
      alert("Mise à jour effectuée avec succés!");
      this.router.navigateByUrl("/users");
    },err=>{
      console.log(err); 
    })

  }
}

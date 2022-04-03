import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent implements OnInit {
  
  constructor(private utilisateurs:ListeUtilisateursService,private router:Router) { }

  ngOnInit(): void {
    
  }

  onSaveUser(data:any)
  {
    
    this.utilisateurs.saveUser(this.utilisateurs.host+'/users',data).subscribe(data=>{
      this.router.navigateByUrl('/users');
      alert("Utilisateur bien ajouté\nnom: "+data.name+"\nEmail: "+data.email);
    },err=>{
      console.log(err);
    })
  }

}

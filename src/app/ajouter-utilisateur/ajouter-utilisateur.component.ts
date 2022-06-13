import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Email } from '../models/email/email';
import { Role } from '../models/Role/role';
import { User } from '../models/user/user';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { DepartementServiceService } from '../services/DepartementService/departement-service.service';
import { EmailService } from '../services/EmailService/email.service';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';
import { RoleService } from '../services/RoleService/role.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent implements OnInit {
  email:Email=new Email();
  currentPassword!:String;
  emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  url!:String;
  roles: typeof Role=Role;
  user:User=new User();
  users!:any[];
  ok:number=0;
  username:any[]=new Array();
  departements!:any[];
  disabled:any=false;
  constructor(private auth:AuthentificationService, private utilisateurs:ListeUtilisateursService,private router:Router,private emailService:EmailService,private depService:DepartementServiceService,private activatedRoute:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    
  this.utilisateurs.getUtilisateurs().subscribe((data:any)=>{
    this.users=data._embedded.users;
    for(let i=0;i<this.users.length;i++)
    {
      this.username[i]=this.users[i].username;
    }
    console.log(this.username);
  })

 
    this.depService.getDepartementsByKeyword("",0,5).subscribe((data:any)=>{
      
      
      this.departements=data._embedded.departements;
      console.log(this.departements);
      this.user.id_dep=this.departements[0];
      
      
      },err=>{
        console.log(err);
      })

      console.log(this.users);
      console.log(this.departements);
      this.user.role_id=Role.USER;
      // this.user.id_dep=this.departements;
      
      console.log("*******");
      console.log(this.departements);
      
  
   
}
  
  generatePassword() {
    var length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

generer()
{
  this.currentPassword=this!.generatePassword();
}

  onSaveUser(data:any)
  {this.user.password=this.currentPassword;
    console.log(data);
    this.email.from="chebbahaziz5@gmail.com";
    this.email.to=data.username;
    this.email.object="mySignDoc Simac";
    this.email.message=data.first_name+" "+data.last_name+" vous étes inscrit dans le site mySignDoc\n"+
     "Voici vos coordonnées : \nemail: "+data.username+
     "\nMot de passe: "+this.currentPassword;
    
     
    this.utilisateurs.register(data).subscribe(()=>{
      // alert("Utilisateur bien ajouté\nNom: "+data.first_name+" "+data.last_name+"\nEmail: "+data.username+"\nRole: "+data.role_id);
      swalWithBootstrapButtons.fire('Utilisateur bien ajouté!',
        'Nom : '+data.last_name+" ||"+" Prénom : "+data.last_name+" || Email: "+data.username+" || Role: "+data.role_id,
        'success'
      )
      this.emailService.enviarEmail(this.email).subscribe(()=>{
      
      },err=>{
        console.log(err);
      })
      this.router.navigateByUrl('/users');
      
      
    },err=>{
      console.log("err");
    })
    
    }


    check(email){
      if(this.username.includes(email))
      {
        this.disabled=true;
        return true;
      }
      else
      {this.disabled=false;
      return false;
      }
    }
    
  

  
  

}

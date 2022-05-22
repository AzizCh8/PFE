import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Email } from '../models/email/email';
import { Role } from '../models/Role/role';
import { User } from '../models/user/user';
import { DepartementServiceService } from '../services/DepartementService/departement-service.service';
import { EmailService } from '../services/EmailService/email.service';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.css']
})
export class ModifierUtilisateurComponent implements OnInit {
  currentUser!:User;
  url!:String;
  roles: typeof Role=Role;
  users!:any[];
  departements!:any[];
  constructor(private route: ActivatedRoute,private router:Router,private activatedRoute:ActivatedRoute,private utilisateurs:ListeUtilisateursService,private emailService:EmailService,private depService:DepartementServiceService) { }
  email:Email=new Email();
  currentPassword!:String;
  url1:string;
  id:any;
  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params['id']);
    console.log(this.url);
    this.id = atob(this.route.snapshot.params['id']);
    const splits = this.id.split('/', 5);
      console.log(splits);
    this.url1="http://localhost:8040/userById?id="+splits[4];
    console.log(this.url1);
    this.utilisateurs.getUser(this.url1).subscribe((data:any)=>{
      console.log(data);
      console.log("*******");
      this.currentPassword=data.password;
      
      this.currentUser=data;
    console.log(this.currentUser.id_dep.name);})
    console.log(this.currentPassword);
    // console.log(this.currentPassword);
    this.depService.getDepartementsByKeyword("",0,5).subscribe((data:any)=>{
      
      
      this.departements=data._embedded.departements;
      console.log(this.departements);
      },err=>{
        console.log(err);
      })

    
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

  onUpdateUser(value:any)
  { 
    
    this.utilisateurs.deleteUser(this.url).subscribe(()=>{

    },err=>{

    })
    this.utilisateurs.register(value).subscribe(data=>{
      swalWithBootstrapButtons.fire('Utilisateur modifié avec succés!',
      '',
      'success'
    )
      this.email.from="chebbahaziz5@gmail.com";
      this.email.to=data.username;
      this.email.object="mySignDoc Simac";
      this.email.message=data.first_name+" "+data.last_name+" vos coordonnées MysignDoc sont mis à jour \n"+
      "Voici vos coordonnées : \nemail: "+data.username+
      "\nMot de passe: "+value.password;
      this.emailService.enviarEmail(this.email).subscribe(()=>{
      
      },err=>{
        console.log(err);
      })
      this.router.navigateByUrl("/users");
    },err=>{
      console.log(err); 
    })

  }
}

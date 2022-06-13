import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { Email } from '../models/email/email';
import { User } from '../models/user/user';
import { AuthentificationService } from '../services/authentification/authentification.service';
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
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private utilisateurs:ListeUtilisateursService,private router:Router,private auth:AuthentificationService,private emailService:EmailService) { }
  public users:any;
  public size=5;
  currentPassword!:String;
  public currentPage=0;
  public totalPages:number=0;
  public pages!: Array<number>;
  public keyword:String="";
  email:Email=new Email();
  public newUser:User=new User();
  showSpinner:boolean=false;

  ngOnInit(): void {
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
  

  chercherUtilisateurs(form:any){
    this.showSpinner=true;
    var email=form.username;
    this.utilisateurs.getUsersByKeyword1(email,0,5).subscribe((data:any)=>{
        this.users=data._embedded.users[0];
        console.log(data);
        console.log(this.users);
        this.currentPassword=this!.generatePassword();
        this.email.from="chebbahaziz5@gmail.com";
        this.email.to=this.users.username;
        this.email.object="mySignDoc Simac";
        this.email.message=this.users.first_name+" "+this.users.last_name+": \n"+"Votre nouveau mot de passe est :"+this.currentPassword;
        var url="http://localhost:8040/users/"+this.users.id;
        
        
       this.newUser.first_name=this.users.first_name;
       this.newUser.last_name=this.users.last_name;
       this.newUser.username=this.users.username;
       this.newUser.role_id=this.users.role_id;
       this.newUser.password=this.currentPassword;
        console.log(this.newUser);



        this.utilisateurs.deleteUser1("http://localhost:8040/users/"+this.users.id).subscribe(()=>{
            
          
        },err=>{
          console.log("err");
        });


        this.utilisateurs.register1(this.newUser).subscribe(()=>{
            
          this.emailService.enviarEmail(this.email).subscribe(()=>{
            this.showSpinner=false;
            swalWithBootstrapButtons.fire("Mot de passe modifié avec succés!",'',
            'success'
          )
            this.router.navigateByUrl("/login");

           },err=>{
             console.log(err);
           });

      },err=>{
        console.log(err); 
      });
         

         
           
        
      },err=>{
        console.log(err); 
      });
  
    }
  }
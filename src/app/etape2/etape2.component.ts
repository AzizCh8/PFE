import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Email } from '../models/email/email';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { EmailService } from '../services/EmailService/email.service';
import { FileService } from '../services/file/file.service';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-etape2',
  templateUrl: './etape2.component.html',
  styleUrls: ['./etape2.component.css']
})
export class Etape2Component implements OnInit {

  constructor(private fileService:FileService,private auth:AuthentificationService,private emailService:EmailService,private router:Router,private utilisateurs:ListeUtilisateursService) { }
  f!:File;
  b!:Blob;
  type!:string;
  file!:File;
  name="Remarques.docx";
  email:Email=new Email();
  isChecked:String="false";
  public users:any;
  selectedUsers: Array<string>=new Array;
  to:string="";
  
  ngOnInit(): void {
    this.utilisateurs.getUtilisateurs().subscribe((data:any)=>{
      
      this.users=data._embedded.users;
      console.log(this.users);
      
  })
  }

  renderFile(filename:String){
    this.fileService.getFilesByName(filename).subscribe(data=>{
      console.log(data);
      this.f=data;
      this.b=data.data;
      this.type=data.type;
      this.file=new File([data.data],this.type)
      console.log(this.file);
    })
  }

  send(data:any)
  {

    console.log(data);
    this.name=localStorage.getItem('file');
    this.renderFile(this.name);
    
    for (var val of this.selectedUsers)
    {
      console.log("val: "+val);
      this.email.from="chebbahaziz5@gmail.com";
    this.email.to=val;
    this.email.object="mySignDoc Simac";
    this.email.message="Vous êtes invités à signer le document "+this.email.attachment+
    "\nMerci de cliquer sur le lien http://localhost:4200/sign pour se rediriger vers la page de signature .";
    this.email.attachment=localStorage.getItem('file');
    this.to+=this.email.to+",\n"
    this.emailService.enviarEmail1(this.email).subscribe(()=>{
      //  localStorage.removeItem('file');
      
      
    
      // localStorage.removeItem('token');
      // localStorage.removeItem('role');
      // localStorage.removeItem('user');
      // localStorage.setItem('signer',"1");
       
    },err=>{
      console.log(err);
    })
  }
  swalWithBootstrapButtons.fire('Demandes de signature envoyés!',
  'à :\n'+this.to,
  'success'
)

      this.router.navigateByUrl("/home");
  }

  addUser(email:any){
    this.selectedUsers.push(email);
    console.log(this.selectedUsers);
  }



}

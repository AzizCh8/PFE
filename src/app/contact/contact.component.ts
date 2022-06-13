import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Email } from '../models/email/email';
import { EmailService } from '../services/EmailService/email.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  email:Email=new Email();
  showSpinner:boolean=false;
  constructor(private emailService:EmailService,private router:Router) { }

  ngOnInit(): void {
  }

  sendMessage(data:any)
  {this.showSpinner=true;
    this.email.from=data.username;
    this.email.to="chebbahaziz5@gmail.com";
    this.email.object="MySignDoc "+data.user+" Message";
    this.email.message= data.message;
    this.emailService.enviarEmailFrom(this.email).subscribe(()=>{
      //  localStorage.removeItem('file');
      this.showSpinner=false;
      swalWithBootstrapButtons.fire("Message bien envoyé !",'',
      'success'
    )
    
          this.router.navigateByUrl("/home");
    
      // localStorage.removeItem('token');
      // localStorage.removeItem('role');
      // localStorage.removeItem('user');
      // localStorage.setItem('signer',"1");
       
    },err=>{
      console.log(err);
    })
  }
  

}

import { Component, OnInit } from '@angular/core';
import  {FormGroup,FormControl,FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { Email } from '../models/email/email';
import { AuthentificationService } from '../services/authentification/authentification.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  mode:number=0;
  email:Email=new Email();
  username!:any;
  
  constructor(private authenticationService:AuthentificationService,private router:Router) { 
    
  }

  ngOnInit(): void {
  }
  
  onLogin(value:any){
    this.authenticationService.login(value).subscribe(response=>{
      let jwt=response.headers.get('Authorization');
      this.authenticationService.saveToken(jwt);
      localStorage.setItem("user",value.username);
      if(localStorage.getItem("signer"))
      this.router.navigateByUrl("/sign");
      else
      this.router.navigateByUrl("/home");

    },err=>{
      this.mode=1;
    })
    
  }

  
  

}

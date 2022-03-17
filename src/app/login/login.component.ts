import { Component, OnInit } from '@angular/core';
import  {FormGroup,FormControl,FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder:FormBuilder) { 
    this.loginForm=formBuilder.group({
    email:new FormControl(),
    password:new FormControl()
     });
  }

  ngOnInit(): void {
  }

}

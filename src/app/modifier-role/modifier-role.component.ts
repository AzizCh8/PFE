import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../models/Role/role';
import { RoleService } from '../services/RoleService/role.service';

@Component({
  selector: 'app-modifier-role',
  templateUrl: './modifier-role.component.html',
  styleUrls: ['./modifier-role.component.css']
})
export class ModifierRoleComponent implements OnInit {
  currentRole!:Role;
  url!:String;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private roleService:RoleService) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params['id']);
    this.roleService.getRole(this.url).subscribe(data=>{this.currentRole=data;})
    console.log(this.url);
  }

  onUpdateRole(value:any)
  {
    this.roleService.update(this.url,value).subscribe(data=>{
      alert("Mise à jour effectuée avec succés!");
      this.router.navigateByUrl("/roles");
    },err=>{
      console.log(err); 
    })

  }

}

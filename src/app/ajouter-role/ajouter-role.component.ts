import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../services/RoleService/role.service';

@Component({
  selector: 'app-ajouter-role',
  templateUrl: './ajouter-role.component.html',
  styleUrls: ['./ajouter-role.component.css']
})
export class AjouterRoleComponent implements OnInit {

  constructor(private roleService:RoleService,private router:Router) { }

  ngOnInit(): void {
  }

  onSaveRole(data:any)
  {
    
    
    this.roleService.saveRole(this.roleService.host+'/roles',data).subscribe((data:any)=>{
      this.router.navigateByUrl('/roles');
      
      alert("Role bien ajouté\nNom: "+data.name);

    },(err: any)=>{
      console.log(err);
    })
    
  }


}

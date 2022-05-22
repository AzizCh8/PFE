import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../services/RoleService/role.service';

@Component({
  selector: 'app-liste-roles',
  templateUrl: './liste-roles.component.html',
  styleUrls: ['./liste-roles.component.css']
})
export class ListeRolesComponent implements OnInit {
  public roles:any;
  public size=5;
  public currentPage=0;
  public totalPages:number=0;
  public pages!: Array<number>;
  public keyword:String="";
  constructor(private roleService:RoleService,private router:Router) { }

  ngOnInit(): void {
  }

  onPageRole(index:number){
    this.currentPage=index;
    this.chercherRoles();

  }

  onChercher(form:any)
  {
    this.currentPage=0;
    this.keyword=form.key;
    this.chercherRoles();


  }

  chercherRoles(){
    this.roleService.getRolesByKeyword(this.keyword,this.currentPage,this.size).subscribe((data:any)=>{
      
      this.totalPages=data.page.totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.roles=data;
      },err=>{
        console.log(err);
      })
  }

  onDeleteRole(u:any)
  { let conf=confirm("Etes vous sur ?");
  if(conf)
    {
      this.roleService.deleteRole(u._links.self.href).subscribe((data:any)=>{
        this.chercherRoles();
        },(err:any)=>{
          console.log("error");
        }
      );
    }
  }

  onEditRole(u:any)
  {
    let url=u._links.self.href;
    this.router.navigateByUrl("/editRole/"+btoa(url));
  }
}

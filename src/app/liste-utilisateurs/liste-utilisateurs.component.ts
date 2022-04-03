import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css']
})
export class ListeUtilisateursComponent implements OnInit {
  public users:any;
  public size=5;
  public currentPage=0;
  public totalPages:number=0;
  public pages!: Array<number>;
  public keyword:String="";

  constructor(private utilisateurs:ListeUtilisateursService,private router:Router) { }

  ngOnInit(): void {
  }

  

  onPageUser(index:number){
    this.currentPage=index;
    this.chercherUtilisateurs();

  }

  onChercher(form:any)
  {
    this.currentPage=0;
    this.keyword=form.key;
    this.chercherUtilisateurs();


  }

  chercherUtilisateurs(){
    this.utilisateurs.getUsersByKeyword(this.keyword,this.currentPage,this.size).subscribe((data:any)=>{
      
      this.totalPages=data.page.totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.users=data;
      alert("hello");
      },err=>{
        console.log(err);
      })
  }

  onDeleteUser(u:any)
  { let conf=confirm("Etes vous sur ?");
  if(conf)
    {
      this.utilisateurs.deleteUser(u._links.self.href).subscribe((data:any)=>{
        this.chercherUtilisateurs();
        },(err:any)=>{
          console.log("error");
        }
      );
    }
  }

  onEditUser(u:any)
  {
    let url=u._links.self.href;
    this.router.navigateByUrl("/editUser/"+btoa(url));
  }
 


}

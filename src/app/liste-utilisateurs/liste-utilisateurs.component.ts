import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { DepartementServiceService } from '../services/DepartementService/departement-service.service';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

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
  public user:any;
  public departements:any;
  public departement:any;
  public depName:String;


  constructor(private utilisateurs:ListeUtilisateursService,private router:Router,private auth:AuthentificationService,public depService:DepartementServiceService) { }

  ngOnInit(): void {

    this.onPageUser(0);
    this.depService.getDepartements1().subscribe((data:any)=>{
      this.departements=data._embedded.departements;
      console.log(this.departements);
    },err=>{
      console.log("rr");
    })
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
    this.utilisateurs.getUsers1(this.keyword,this.currentPage).subscribe((data:any)=>{
      console.log(data);
      this.totalPages=data.totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.users=data.content;
      console.log(this.users);
      console.log(data);
      },err=>{
        this.auth.logout();
        this.router.navigateByUrl("/login");
        console.log(err);
      })
  }

  getDepartements(){
    this.depService.getDepartements1().subscribe(data=>{
      console.log("hhhhhhhh");
      console.log(data);
     this.departements=data;
     
    },err=>{
      console.log("err");
    })
  }
  getDepartement(url:any)
  {
    this.depService.getDepartement(url).subscribe(data=>{
      this.departement=data;
      console.log(url);
    },err=>{
      console.log("err");
    })
  }
  getDepName(id:number){
    this.depService.getDepById(id).subscribe((data:any)=>{
      this.depName=data;
      console.log(this.depName);
      
    })
  }

  onDeleteUser(u:any)
  { swalWithBootstrapButtons.fire({
    title: 'Vous êtes sûrs?',
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimez-le !',
    cancelButtonText: 'Non, annulez !',
    reverseButtons: true
  }).then((result) => {
  if(result.isConfirmed)
    {
      this.utilisateurs.deleteUser("http://localhost:8040/users/"+u.id).subscribe((data:any)=>{
        this.chercherUtilisateurs();
        },(err:any)=>{
          console.log("error");
        }
      );
    }
    else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Annulé',
        'L\'utilisateur n\'a pas été supprimé.',
        'error'
      )
    }
  })
  }
  
  
  
  

  onEditUser(u:any)
  {
    let url="http://localhost:8040/users/"+u.id;
    this.router.navigateByUrl("/editUser/"+btoa(url));
  }
 


}

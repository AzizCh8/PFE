import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartementServiceService } from '../services/DepartementService/departement-service.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
@Component({
  selector: 'app-liste-departements',
  templateUrl: './liste-departements.component.html',
  styleUrls: ['./liste-departements.component.css']
})
export class ListeDepartementsComponent implements OnInit {

  public departements:any;
  public size=5;
  public currentPage=0;
  public totalPages:number=0;
  public pages!: Array<number>;
  public keyword:String="";
  
  constructor(private depService:DepartementServiceService,private router:Router) { }

  ngOnInit(): void {
    this.onPageDepartement(0);
    
  }

  onPageDepartement(index:number){
    this.currentPage=index;
    this.chercherDepartements();

  }

  onChercher(form:any)
  {
    this.currentPage=0;
    this.keyword=form.key;
    this.chercherDepartements();


  }

  chercherDepartements(){
    this.depService.getDepartementsByKeyword(this.keyword,this.currentPage,this.size).subscribe((data:any)=>{
      
      this.totalPages=data.page.totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.departements=data;
      console.log(this.departements);
      },err=>{
        console.log(err);
      })
  }

  onDeleteDepartement(u:any)
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
      this.depService.deleteDepartement(u._links.self.href).subscribe((data:any)=>{
        this.chercherDepartements();
        swalWithBootstrapButtons.fire(
          'Supprimé !',
          'Le département a été supprimé.',
          'success'
        )
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
        'Le département n\'a pas été supprimé.',
        'error'
      )
    }
  })
  }

  onEditDepartement(u:any)
  {
    let url=u._links.self.href;
    this.router.navigateByUrl("/editDepartement/"+btoa(url));
  }
}



function icon(icon: any, arg1: string, arg2: string, arg3: string, arg4: string) {
  throw new Error('Function not implemented.');
}


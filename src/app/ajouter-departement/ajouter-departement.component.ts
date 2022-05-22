import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Departement } from '../models/departement/departement';
import { DepartementServiceService } from '../services/DepartementService/departement-service.service';


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
@Component({
  selector: 'app-ajouter-departement',
  templateUrl: './ajouter-departement.component.html',
  styleUrls: ['./ajouter-departement.component.css']
})
export class AjouterDepartementComponent implements OnInit {
  departements!:any[];
  depName:any[]=new Array();
  departement:Departement=new Departement();
  constructor(private depService:DepartementServiceService,private router:Router) { }

  ngOnInit(): void {
    this.depService.getDepartements1().subscribe((data:any)=>{
      this.departements=data._embedded.departements;
      for(let i=0;i<this.departements.length;i++)
      {
        this.depName[i]=this.departements[i].name;
      }
      console.log(this.depName);
    })
  }

  onSaveDepartement(data:any)
  {
      console.log(data);
    
      this.depService.saveDepartement(this.depService.host+'/departements',data).subscribe((data)=>{
        swalWithBootstrapButtons.fire('Departement bien ajouté!',
        'Nom du nouveau département : '+data.name,
        'success'
      )
        this.router.navigateByUrl('/departements');
      
      // alert("Departement bien ajouté\nNom: "+data.name);
        
        
    },(err: any)=>{
      console.log(err);
    })
    
  }
}

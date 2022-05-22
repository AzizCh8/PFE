import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-modifier-departement',
  templateUrl: './modifier-departement.component.html',
  styleUrls: ['./modifier-departement.component.css']
})
export class ModifierDepartementComponent implements OnInit {

  currentDepartement!:Departement;
  url!:String;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private depService:DepartementServiceService) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params['id']);
    this.depService.getDepartement(this.url).subscribe(data=>{this.currentDepartement=data;})
    console.log(this.url);
  }

  onUpdateDepartement(value:any)
  {
    this.depService.update(this.url,value).subscribe((data:any)=>{
      swalWithBootstrapButtons.fire('Departement modifié avec succés!',
  '',
  'success'
)
      this.router.navigateByUrl("/departements");
    },(err:any)=>{
      console.log(err); 
    })

  }

}

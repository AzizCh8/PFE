import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';
import { FileService } from '../services/file/file.service';
import { ListeUtilisateursService } from '../services/listeUtilisateursService/liste-utilisateurs.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-sign-doc',
  templateUrl: './sign-doc.component.html',
  styleUrls: ['./sign-doc.component.css']
})
export class SignDocComponent implements OnInit {
  progress = 0;
  message = '';
  idUser:number=0;
  fileInfos: Observable<any>;
  f:any;
  files!:any[];
  showSpinner:boolean=false;
  constructor(private fileService:FileService,private http:HttpClient,private router:Router,private utilisateurs:ListeUtilisateursService) { }

  ngOnInit(): void {
    //  this.f=localStorage.getItem('file') ;
     const email=localStorage.getItem('user');
    this.utilisateurs.findUser1(email).subscribe((data:any)=>{
      console.log("data: "+data);
        this.idUser=data;
        console.log("idUser: "+this.idUser);
        this.fileService.findFilesByProcessus(this.idUser).subscribe((data1:any)=>{
      
          this.files=data1;
          console.log(this.files);
      })
        
    })
    
    

  }

  sign(filename1:string){
    this.showSpinner=true;
    console.log("idUser: "+this.idUser);

    this.fileService.sign(filename1).subscribe(event=>{
      this.showSpinner=false;
      swalWithBootstrapButtons.fire("fichier signé avec succès !",
      "",
  'success'
)
      
      localStorage.removeItem('signer');
      localStorage.removeItem('file');
       

      window.location.reload();
     
    },
    err=>{
      console.log("err");
    }
    );
    
  }
  

  
  viewFile(filename: any): void{

    const baseUrl = 'http://localhost:8040/file/view/'+filename;
    
    this.http.get(baseUrl ,{responseType: 'blob'}).subscribe(
        (response: any) =>{
          console.log(filename);
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                {downloadLink.setAttribute('inline', filename);
                downloadLink.setAttribute("target", "_blank");}
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }
    
  

  downloadFile(filename: any): void{

    const baseUrl = 'http://localhost:8040/file/downloadd/'+filename;
    
    this.http.get(baseUrl ,{responseType: 'blob'}).subscribe(
        (response: any) =>{
          console.log(filename);
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }



}

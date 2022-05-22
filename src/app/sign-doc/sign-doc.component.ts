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
    this.fileService.findByProcessus(1).subscribe(data=>{
      this.f=data;
      console.log(this.f);
    })
    

  }

  sign(filename1:string){
    
    console.log(this.f);  
    console.log("idUser: "+this.idUser);
    let timerInterval
Swal.fire({
  title: 'Auto close alert!',
  html: 'I will close in <b></b> milliseconds.',
  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    var b:any = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
    this.fileService.sign(filename1).subscribe(event=>{
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
  
  downloadFile(filename:string): void{

    const baseUrl = 'http://localhost:8040/file/download/'+filename;
    
    this.http.get(baseUrl ,{responseType: 'blob'}).subscribe(
        (response: any) =>{
          console.log(this.f);
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (this.f)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }

  viewFile(): void{


    const baseUrl = 'http://localhost:8040/file/view/'+this.f.name;
    
    this.http.get(baseUrl ,{responseType: 'blob'}).subscribe(
        (response: any) =>{
          console.log(this.f);
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (this.f)
                downloadLink.setAttribute('inline', this.f.name);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }



}

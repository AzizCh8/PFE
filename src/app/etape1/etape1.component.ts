import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file/file.service';
import {saveAs} from 'file-saver';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-etape1',
  templateUrl: './etape1.component.html',
  styleUrls: ['./etape1.component.css']
})
export class Etape1Component implements OnInit {
  filenames: String[]=[];
  fileStatus={status:'',requestType:'',percent:0};
  selectedFiles!: FileList;
  currentFile: File;
  selected:File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  a:Array<any>;
  li=document.getElementsByClassName("list");
  clickk:boolean=false;
  uploaded:boolean=false;
  isDisabled:boolean=!(this.selectedFiles);
  textt:string="";
  
  constructor(private fileService:FileService,private http:HttpClient) { }

  

  ngOnInit(): void {
    this.fileInfos = this.fileService.getFiles();
    console.log(this.isDisabled);
  }



  selectFile(event): void {
    console.log(event.target.files);
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    this.a = Array.from(this.selectedFiles);
    this.isDisabled=!(this.selectedFiles.length>0);
    console.log(this.isDisabled);
    if(!this.isDisabled)
    this.textt="";
}


  //function to upload files
  onUploadFiles():void{
    console.log(this.isDisabled)
    if(this.isDisabled==true){
      this.textt="Aucun fichier n'est chargé !!!";
      console.log(this.textt);
    }
    else
    {console.log(this.isDisabled);
      this.textt="";
      console.log("text: "+this.textt);
      const formData=new FormData();
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.selectedFiles);
    console.log(this.currentFile);
    //for(const file of files){
      //formData.append('files',file,file.name);
      for(let i=0;i<this.selectedFiles.length;i++)
      {this.currentFile=this.selectedFiles.item(i);
        this.fileService.upload(this.currentFile).subscribe(
        event=>{
          this.uploaded=true;
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.fileService.getFiles();
          }
        },
        err=>{
          this.progress = Math.round(0);
          this.uploaded=false;
          swalWithBootstrapButtons.fire("Fichier déja signé !",'Veuillez voir la liste des processus',
      'error'
    )
        }
      );
      }
    }}
  


 

    
   
    viewFile(filename: any): void{

      const baseUrl = 'http://localhost:8040/file/view/'+filename.name;
      
      this.http.get(baseUrl ,{responseType: 'blob'}).subscribe(
          (response: any) =>{
            console.log(filename);
              let dataType = response.type;
              let binaryData = [];
              binaryData.push(response);
              let downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
              if (filename)
                  {downloadLink.setAttribute('inline', filename.name);
                  downloadLink.setAttribute("target", "_blank");}
              document.body.appendChild(downloadLink);
              downloadLink.click();
          }
      )
    }
      
    
  
    downloadFile(filename: any): void{

      const baseUrl = 'http://localhost:8040/file/downloadd/'+filename.name;
      
      this.http.get(baseUrl ,{responseType: 'blob'}).subscribe(
          (response: any) =>{
            console.log(filename);
              let dataType = response.type;
              let binaryData = [];
              binaryData.push(response);
              let downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
              if (filename)
                  downloadLink.setAttribute('download', filename.name);
              document.body.appendChild(downloadLink);
              downloadLink.click();
          }
      )
    }
  // private reportProgress(httpEvent: HttpEvent<String[]|Blob>):void {
  //   switch(httpEvent.type){
  //     case HttpEventType.UploadProgress:
  //       this.updateStatus(httpEvent.loaded,httpEvent.total,'Uploading');
  //       break;

  //     case HttpEventType.DownloadProgress:
  //       this.updateStatus(httpEvent.loaded,httpEvent.total,'Downloading');
  //       break;

  //     case HttpEventType.ResponseHeader:
  //         console.log('Header returned',httpEvent);
  //         break;

  //     case HttpEventType.Response:
  //         if(httpEvent.body instanceof Array){
  //           for(const filename of httpEvent.body)
  //           {
  //             this.filenames.unshift(filename);
  //           }
  //         }
  //         else{
  //           saveAs(new File([httpEvent.body!],httpEvent.headers.get('File-Name')!,
  //           {type:`${httpEvent.headers.get('Content-Type')};charset=utf-8`}))

  //           // saveAs(new Blob([httpEvent.body!],{type:`${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
  //           // httpEvent.headers.get('File-Name'));
  //         }
  //         break;
  //         default:
  //           console.log(httpEvent);
  //   }
  // }
  // private updateStatus(loaded: number, total: number ,requestType: string) {
  //  this.fileStatus.status='progress';
  //  this.fileStatus.requestType=requestType;
  //  this.fileStatus.percent=Math.round((100*loaded)/total);

  // }

}


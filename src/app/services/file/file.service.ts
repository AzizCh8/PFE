import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListeUtilisateursService } from '../listeUtilisateursService/liste-utilisateurs.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
   host="http://localhost:8040";
   idUser!:String;
   user!:string;
  constructor(private http:HttpClient,private utilisateurs:ListeUtilisateursService) { }

  //function to upload files
//   upload(formData:FormData):Observable<HttpEvent<String[]>>{
//     return this.http.post<String[]>(this.host+"/file/upload",formData,{
//       reportProgress:true,
//       observe:'events'
//     })
//   }


findByProcessus(id:number){
  return this.http.get(this.host+"/file/fileByProcessus?id="+id);
}
downloadd(filename:String):Observable<HttpEvent<Blob>>{
  return this.http.get(this.host+"/file/downloadd/"+filename,{
    reportProgress:true,
    observe:'events',
    responseType:'blob'
  })
}

  //function to download files
  download(filename:String):Observable<HttpEvent<Blob>>{
    return this.http.get(this.host+"/file/download/"+filename,{
      reportProgress:true,
      observe:'events',
      responseType:'blob'
    })
  }

  sign(filename:string): Observable<any> 
  { 
    
    this.user=localStorage.getItem("user");

    return this.http.post(this.host+"/file/signn/"+this.user+"/"+filename,{
      observe:'events'
    })
  }
upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  formData.append('files', file);
  localStorage.setItem('file',file.name);
  return this.http.post<String[]>(this.host+"/file/uploadd",formData,{
        reportProgress:true,
        observe:'events'
  });
  
}


onUpload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  formData.append('files', file);
  localStorage.setItem('file',file.name);
  
  return this.http.post<String[]>(this.host+"/file/uploaddd/"+this.user,formData,{
        reportProgress:true,
        observe:'events'
  });
  
}

viewFile(filename:any):Observable<HttpEvent<Blob>>
{
  return this.http.get(this.host+"/file/view/"+filename,{
    reportProgress:true,
    observe:'events',
    responseType:'blob'
  })
}



getFiles(): Observable<any> {
  return this.http.get(`${this.host}/files`);
}

getFileByName(name:String): Observable<any>{
  return this.http.get(this.host+"/file/name/"+name);
}

getFilesByName(name:String): Observable<any>{
  return this.http.get(this.host+"/file/namee/"+name);
}


findFilesByProcessus(id:number){
  return this.http.get(this.host+"/file/filesByProcessus?id="+id);
}

 }

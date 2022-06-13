import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Processus } from '../models/processus/processus';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { ProcessusService } from '../services/ProcessusService/processus.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProcessusUserService } from '../services/processusUserService/processus-user.service';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-liste-processus',
  templateUrl: './liste-processus.component.html',
  styleUrls: ['./liste-processus.component.css']
})
export class ListeProcessusComponent implements OnInit {
  public processus:any;
  public size=5;
  public currentPage=0;
  public totalPages:number=0;
  public pages!: Array<number>;
  public keyword:String="";
  data1: any[] = new Array();
  users:any[][]=new Array();
  i:number=0;
  click:any[];
  j:number=0;
  str:string="";
  finalVide:any;
  okk:any;
  list: any;
  s: string="";
  
  constructor(private http:HttpClient, private processusService:ProcessusService,private router:Router,private auth:AuthentificationService,private processusUser:ProcessusUserService) { }

  ngOnInit(): void {
    this.onPageProcessus(0);
  }

  onPageProcessus(index:number){
    
    
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
    this.processusService.getProcessus(this.keyword,this.currentPage).subscribe((data:any)=>{
      console.log(data);
      this.totalPages=data.totalPages;
      this.pages=new Array<number>(this.totalPages);
      this.processus=data.content;
      console.log(this.processus);
      console.log(data);
      var l=0
      for(var i of this.processus)
      {
        
        this.processusService.getUsersByProcessusId(i.id_processus).subscribe((data:any)=>{
          this.processus[l].signataires=new Array();
          var k=0;
          for(var i of data)
          {console.log(i);
            this.processus[l].signataires[k]=i;
          k++;   
        }
        l++;
        this.j++;
        });
        
        console.log(this.processus);
        
       
          
        this.j++;
          console.log("j1: "+this.j);
          

      }
      
      

      console.log("data1:"+this.data1);
      
      
     
      },err=>{
        this.auth.logout();
        this.router.navigateByUrl("/login");
        console.log(err);
      })
  }

  
  findSignataires(id:number){
    this.processusService.getUsersByProcessusId(id).subscribe((data:any)=>{
      var j=0;
      this.click=new Array();
      for(var i of data)
      {console.log(i);
      this.click[j]=data[j].first_name+" "+data[j].last_name+",\n";
      j++;
    }
      alert("les signataires de ce processus sont :\n"+this.click);
  })
}

  download(){
    console.log(this.processus);
    var l=0;
    for(var i of this.processus)
      {this.data1[l]=new Object();
      this.data1[l].id_processus=this.processus[l].id_processus;
      this.data1[l].name_processus=this.processus[l].name_processus;
      this.data1[l].emission_date=this.processus[l].emission_date;
      this.data1[l].status=this.processus[l].status;
      this.data1[l].initialFile=this.processus[l].initialFile.name;
      if(!this.processus[l].finalFile)
      this.data1[l].finalFile="fichier final n'est pas encore disponible";
      else
      this.data1[l].finalFile=this.processus[l].finalFile.name;
      
      var k=0;
      
      var str="";
      for(var j of this.processus[l].signataires)
      {  str="signataire"+k;
      console.log(str);
      if(this.processus[l].signataires[0])
        this.data1[l].signataire1=this.processus[l].signataires[0].first_name+" "+this.processus[l].signataires[0].last_name;
       
     
     if(this.processus[l].signataires[1])
        this.data1[l].signataire2=this.processus[l].signataires[1].first_name+" "+this.processus[l].signataires[1].last_name;
       
        if(this.processus[l].signataires[2])
        this.data1[l].signataire3=this.processus[l].signataires[2].first_name+" "+this.processus[l].signataires[2].last_name;
       
        if(this.processus[l].signataires[3])
        this.data1[l].signataire4=this.processus[l].signataires[3].first_name+" "+this.processus[l].signataires[3].last_name;
       
     
     
   }

       l++;
         
    }
      console.log(this.data1);
      var csvData = this.ConvertToCSV(this.data1);
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
    
      if(navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, "sssss");
      } else {
        var a = document.createElement("a");
        a.href = url;
        a.download = 'ListeProcessus.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      window.URL.revokeObjectURL(url);
  
}

ConvertToCSV(objArray: any): string {
  console.log(objArray);
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var row = "";

  for (var index in objArray[0]) {
      //Now convert each value to string and comma-separated
      row += index + ',';
  }
  row = row.slice(0, -1);
  //append Label row with line break
  str += row + '\r\n';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }
      str += line + '\r\n';
  }
  return str;
}

public exportAsExcelFile(): void {
  var l=0;
  for(var i of this.processus)
    {this.data1[l]=new Processus;
    this.data1[l].id_processus=this.processus[l].id_processus;
    this.data1[l].name_processus=this.processus[l].name_processus;
    this.data1[l].emission_date=this.processus[l].emission_date;
    this.data1[l].status=this.processus[l].status;
    this.data1[l].initialFile=this.processus[l].initialFile.name;
    if(!this.processus[l].finalFile)
    this.data1[l].finalFile="fichier final n'est pas encore disponible";
    else
    this.data1[l].finalFile=this.processus[l].finalFile.name;
    
    var k=0;
    
    var str="";
    for(var j of this.processus[l].signataires)
     {  str="signataire"+k;
     console.log(str);
     if(this.processus[l].signataires[0])
       this.data1[l].signataire1=this.processus[l].signataires[0].first_name+" "+this.processus[l].signataires[0].last_name;
      
    
    if(this.processus[l].signataires[1])
       this.data1[l].signataire2=this.processus[l].signataires[1].first_name+" "+this.processus[l].signataires[1].last_name;
      
       if(this.processus[l].signataires[2])
       this.data1[l].signataire3=this.processus[l].signataires[2].first_name+" "+this.processus[l].signataires[2].last_name;
      
       if(this.processus[l].signataires[3])
       this.data1[l].signataire4=this.processus[l].signataires[3].first_name+" "+this.processus[l].signataires[3].last_name;
      
    
    
  }

     l++;
       
  }
  
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data1);

  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, "ListeProcessus");
}

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
  fileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
}


export()
{
  Swal.fire({
    title: 'Choisir le format de fichier',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Fichier Excel',
    denyButtonText: `Fichier CSV`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.exportAsExcelFile();
      Swal.fire('Liste des processus telechargée sur votre machine!', '', 'success');
    } else if (result.isDenied) {
      this.download();
      Swal.fire('Liste des processus telechargée sur votre machine ', '', 'success')
    }
  })
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

afficher(id_processus:any){
  this.processusUser.getProcessus(id_processus).subscribe((data:any)=>{
    this.list=data;
    this.s="";
    for(var i=0;i<this.list.length;i++)
    {if(this.list[i].signature_date)
        this.s+="           "+this.list[i].user.first_name+""+this.list[i].user.last_name+" : "+this.list[i].signature_date+"       |    ";
        else
        this.s+="           "+this.list[i].user.first_name+""+this.list[i].user.last_name+" : pas encore     |      ";

    }
    Swal.fire(
      'Date des signatures',
      this.s
      
      
    )
  })
}


}

declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}
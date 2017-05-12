import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';  
import { Observable } from 'rxjs/Rx'; 
import { FileService } from '../_services/index';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  private isUploadBtn: boolean = true;  
  private fileUploadMsg: string;
constructor(private http: Http,private fileService: FileService) {  
} 

//file upload event  
fileChange(event) {  
let fileList: FileList = event.target.files;  
if (fileList.length > 0) {  
let file: File = fileList[0];  
let formData: FormData = new FormData();  
formData.append('uploadFile', file, file.name);  
this.fileService.postFile(formData)
  .subscribe(data => {
   this.fileUploadMsg = data.message;
                
            }); 
} 
}
  ngOnInit() {
  }

}

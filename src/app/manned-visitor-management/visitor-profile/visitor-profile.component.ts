import { Component, OnInit} from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.component.html',
  styleUrls: ['./visitor-profile.component.css']
})
export class VisitorProfileComponent implements OnInit {
  isPreRegisters: boolean;
  visitor: any;
  visitorCategory = ['Contractor','Developer','Designer','Broker','Politician'];
  isPreRegistered = true;
  yesClass = 'yes';
  noClass  = 'no';
  upload:boolean = false;
  imageurl: any;
  isFile: boolean;
  preRegForm = this.fb.group({
    email: [''],
    phone: [''],
    startDate: [''],
    startTime: [''],
    endDate: [''],
    endTime: ['']
  });
  hostSelected: boolean = false;
  host: any;

  category:any;
  purpose:any;
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService,
              private _location: Location,
              private fb: FormBuilder,) { }

  ngOnInit() {
   this.mannedVisitorMangementService.getVisitor().subscribe(v => {
    console.log(v)
    this.isPreRegisters = v.isPreRegistered;
    this.visitor = v.profile;
    })
  }
  onSelectHost(host){
    this.host = host;
    if(host.hasOwnProperty('id')){
      this.hostSelected = true;
      let element:HTMLElement = document.getElementById('closeed') as HTMLElement;
      element.click();
    }
  }
  preRegister(value){
    if(value  === 'yes'){
      this.yesClass = value
      this.noClass = 'no'
      this.isPreRegistered = true;
    }else if(value  === 'no'){
      this.yesClass = value
      this.noClass = 'yes'
      this.isPreRegistered = false;
    }
    
  }

  back(){
    this._location.back();
  }
  

  onUpload(){
    this.upload = true;
  }

  onSelectCategory(c){
    console.log(c)
      this.category = c
  }
  public files: UploadFile[] = [];
 
  public dropped(event) {
    if(event.files){
    for (const droppedFile of event.files) {
 
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          var reader = new FileReader();

          reader.readAsDataURL(file); // read file as data url
    
          reader.onload = (event:any) => { // called once readAsDataURL is completed
    
            console.log(event)
            this.imageurl = event.target.result;
            this.upload = false;
            this.isFile = true;
            let element:HTMLElement = document.getElementById('close') as HTMLElement;
            element.click();
          }
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
       console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }else{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed

        console.log(event)
        this.imageurl = event.target.result;
        this.upload = false;
        this.isFile = true;
        let element:HTMLElement = document.getElementById('close') as HTMLElement;
        element.click();
      }
    }
  }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }


  onSubmit(){
    console.log(this.purpose)
  }

}
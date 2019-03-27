import { Component, OnInit} from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {WebcamImage} from 'ngx-webcam';
import { NavigationEnd } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.component.html',
  styleUrls: ['./visitor-profile.component.css']
})
export class VisitorProfileComponent implements OnInit {
  date = new FormControl(new Date());
  isPreRegisters: boolean;
  isVegetarion:boolean;
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
  checked = false;
  category:any;
  value:any;
  purpose:any;
  food:any;
  email:any;
  profile:any  = 'Private'
  // latest snapshot
  public webcamImage;
  modalImage: any;
  questionProfiles: any;
  selectedQP:any;
  profileQuestions: any;
  defaultValue: any;
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService,
              private _location: Location,
              private fb: FormBuilder,
              private route: Router) { }

  ngOnInit() {
   this.mannedVisitorMangementService.getVisitor().subscribe(v => {
    this.isPreRegisters = v.isPreRegistered;
    if(v.isPreRegistered){
      // console.log(v.profile)
      this.preRegForm.controls['email'].setValue(v.profile.EmailAddress);
      this.preRegForm.controls['phone'].setValue(v.profile.Phone);
      this.preRegForm.controls['startDate'].setValue(v.profile.PreRegistrationStartDate);
      this.preRegForm.controls['startTime'].setValue(this.getTime(v.profile.PreRegistrationStartDate));
      this.preRegForm.controls['endDate'].setValue(v.profile.PreRegistrationEndDate);
      this.preRegForm.controls['endTime'].setValue(this.getTime(v.profile.PreRegistrationEndDate));
    }
    this.visitor = v.profile;
    })
  this.mannedVisitorMangementService.getQuestionProfile().subscribe( async v=>{
    this.questionProfiles = JSON.parse(JSON.stringify(v)).Data;
    this.selectedQP = this.questionProfiles[0].ProfileName
    if(this.visitor){
    this.getProfileQuestions(this.questionProfiles[0].QuestionProfileSys)
    }
  })
  }

  onselectProfile(e){
    let qp = this.questionProfiles.find((q)=>q.ProfileName===e.value)
    this.getProfileQuestions(qp.QuestionProfileSys)
  }

  getProfileQuestions(QuestionProfileSys){
    let that = this
    this.mannedVisitorMangementService.getQuestions(QuestionProfileSys).subscribe(f=>{
          let qResponse =  JSON.parse(JSON.stringify(f)).Data
          console.log(qResponse[0].DefaultValue)
          that.defaultValue = qResponse[0].DefaultValue
          that.mannedVisitorMangementService.getQuestionAnswers(QuestionProfileSys, that.visitor.ContactSys)
            .subscribe(answers=>{
               let qanswers = JSON.parse(JSON.stringify(answers)).Data
               console.log(qanswers)
               qResponse.forEach(question => {

                  qanswers.filter((ans)=> {
                    if(ans.QuestionSys === question.QuestionSys){
                      question.Answer = ans.Answer
                    }})
               });
               
            })
            qResponse.sort((a, b) => a.DisplayOrder - b.DisplayOrder);
            console.log(qResponse)
          this.profileQuestions  = qResponse
    }) 
  }
  getTime(newdate){
    var date = new Date(newdate);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }
  openImageModal(imageurl){
    console.log(imageurl)
    this.modalImage = imageurl;
    let element:HTMLElement = document.getElementById('image') as HTMLElement;
        element.click();
  }
  
  handleImage(webcamImage: WebcamImage) {
    this.imageurl = webcamImage.imageAsDataUrl;
    this.isFile = true;
  }
  onKeep(e){
    console.log(e)
    if(e){
      let element:HTMLElement = document.getElementById('closeCamera') as HTMLElement;
            element.click();
    }else{
      let element:HTMLElement = document.getElementById('closeCamera') as HTMLElement;
            element.click();
      this.imageurl =''
    }
  }
  onSelectHost(host){
    console.log(host)
    this.host = host;
    if(host.hasOwnProperty('ContactName')){
      this.hostSelected = true;
      let element:HTMLElement = document.getElementById('closeed') as HTMLElement;
      element.click();
    }
  }
  isVeg(value){
    if(value  === 'yes'){
      this.yesClass = value
      this.noClass = 'no'
      this.isVegetarion = true;
    }else if(value  === 'no'){
      this.yesClass = value
      this.noClass = 'yes'
      this.isVegetarion = false;
    }
    
  }

  back(){
    this._location.back();
  }
  

  onUpload(){
    this.upload = true;
  }

  onChange(e){
    if(!e.checked){
      // this.checked = false;
      this.profile = 'Private'
    }else{
      // this.checked = true;
      this.profile = 'Public'
    }
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
    this.profileQuestions.filter((q)=>{
      if(q.SettingValueTypeName === "Picture"){
        q.Answer =  this.imageurl
      }
    })

    let visitorProfile = {
      preRegisterData:this.preRegForm.value,
      profileData:this.profileQuestions,
      host: this.host,
      visitor: this.visitor,
      isPreRegisters:this.isPreRegisters
    }
    console.log(visitorProfile)
    this.mannedVisitorMangementService.setVisitorProfile(visitorProfile)
    this.route.navigate(['/mannedvisitormanagement/visitor-confirmation'])
  }

}

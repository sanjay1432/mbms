import { Component, OnInit, Inject} from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {WebcamImage} from 'ngx-webcam';
import { NavigationEnd } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomeLoaderComponent } from '../custome-loader/custome-loader.component'
  import { from } from 'rxjs';
  
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
  selectedQuestion: any;
  choosedQuestionsArray: any = [];
  mainDecisionQuestions: any = [];
  allProfileQuestions: any;
  visitorHostQuestion: any = null;
  visitorPictureQuestion: any = null;
  loaderDialog: MatDialogRef<CustomeLoaderComponent, any>;
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService,
              private _location: Location,
              private fb: FormBuilder,
              private route: Router,
              public dialog: MatDialog,
              ) { 
                this.loaderDialog = this.dialog.open(CustomeLoaderComponent, {
                  width: '600px'
                });
              }

  ngOnInit() {
   
   this.mannedVisitorMangementService.getVisitor().subscribe(v => {
     console.log('Visitor &&&&',v)
    this.isPreRegisters = v.isPreRegistered;
    if(v.isPreRegistered){
  
      this.preRegForm.controls['email'].setValue(v.profile.EmailAddress);
      this.preRegForm.controls['phone'].setValue(v.profile.Phone);
      this.preRegForm.controls['startDate'].setValue(v.profile.PreRegistrationStartDate);
      this.preRegForm.controls['startTime'].setValue(this.getTime(v.profile.PreRegistrationStartDate));
      this.preRegForm.controls['endDate'].setValue(v.profile.PreRegistrationEndDate);
      this.preRegForm.controls['endTime'].setValue(this.getTime(v.profile.PreRegistrationEndDate));
    }
    this.visitor = v.profile;
    console.log('At visioto screen',this.visitor)
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
    this.mainDecisionQuestions = []
    this.allProfileQuestions =[]
    this.mannedVisitorMangementService.getQuestions(QuestionProfileSys).subscribe(f=>{
          let qResponse =  JSON.parse(JSON.stringify(f)).Data
          console.log(qResponse)
          console.log(that.visitor.ContactSys)
          that.defaultValue = qResponse[0].DefaultValue
          if(that.visitor.ContactSys){
          that.mannedVisitorMangementService.getQuestionAnswers(QuestionProfileSys, that.visitor.ContactSys)
            .subscribe(answers=>{
              this.loaderDialog.close();
               let qanswers = JSON.parse(JSON.stringify(answers)).Data
               if(qanswers.length>1){
                    qResponse.forEach(question => {

                        qanswers.filter((ans)=> {
                          if(ans.QuestionSys === question.QuestionSys){
                            question.Answer = ans.Answer
                          }})
                    });
              }
               qResponse.sort((a, b) => a.DisplayOrder - b.DisplayOrder);
       
               this.visitorHostQuestion = qResponse.find((question)=>question.MappedColumnName === "ToSeeContactName")
              
               //Update the Host Answer if available
               if(this.visitorHostQuestion.Answer){
                  this.hostSelected = true
                  this.host = {
                    ContactName:this.visitorHostQuestion.Answer
                  }
                }
               this.visitorPictureQuestion = qResponse.find((question)=>question.MappedColumnName === "ImageSys")
                console.log('visitorHostQuestion',this.visitorHostQuestion)
               // this.profileQuestions  = qResponse
               this.allProfileQuestions = qResponse
               this.profileQuestions = qResponse.filter((question)=> question.MappedColumnName != "ToSeeContactName" && question.MappedColumnName != "ImageSys")
               
               //select questions with decisions & no depency over others questions
               qResponse.forEach(q => {
              
                  let exist = qResponse.find((myq)=> this.questionExists(q.QuestionSys, myq.Decisions))
                   if(!exist && q.Decisions.length>0){   
                     return this.mainDecisionQuestions.push(q)
                   }
               });
               console.log(this.mainDecisionQuestions)
               //Check if main decision question already answered
               this.mainDecisionQuestions.forEach(el => {
   
                  if(el.Answer){
                      let givenAnswer = el.Decisions.find((d)=>d.OptionName === el.Answer)
                    this.onSelect(givenAnswer,el.QuestionSys, true)
                  }
               });

               console.log(this.mainDecisionQuestions)

               
            })

          }else{
            this.loaderDialog.close();
              qResponse.sort((a, b) => a.DisplayOrder - b.DisplayOrder);
       

              // this.profileQuestions  = qResponse
              this.allProfileQuestions = qResponse
              this.visitorHostQuestion = qResponse.find((question)=>question.MappedColumnName === "ToSeeContactName")
               this.visitorPictureQuestion = qResponse.find((question)=>question.MappedColumnName === "ImageSys")
                console.log('visitorHostQuestion',this.visitorHostQuestion)
               this.profileQuestions = qResponse.filter((question)=> question.MappedColumnName != "ToSeeContactName" && question.MappedColumnName != "ImageSys")
              
              //select questions with decisions & no depency over others questions
              qResponse.forEach(q => {
             
                 let exist = qResponse.find((myq)=> this.questionExists(q.QuestionSys, myq.Decisions))
                  if(!exist && q.Decisions.length>0){   
                    return this.mainDecisionQuestions.push(q)
                  }
              });
               
              //Check if main decision question already answered
              this.mainDecisionQuestions.forEach(el => {
  
                 if(el.Answer){
                     let givenAnswer = el.Decisions.find((d)=>d.OptionName === el.Answer)
                   this.onSelect(givenAnswer,el.QuestionSys, true)
                 }
              });

            }
          
    }) 
  }
  questionExists(questionsys, arr) {
    return arr.some(function(el) {
      return el.NextQuestionSys === questionsys;
    }); 
  }
  getTime(newdate){
    var date
    if(newdate){
      date = new Date(newdate);
    }else{
      date = new Date();
    }
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }
  openImageModal(imageurl){
 
    this.modalImage = imageurl;
    let element:HTMLElement = document.getElementById('image') as HTMLElement;
        element.click();
  }
  
  handleImage(webcamImage: WebcamImage) {
    this.imageurl = webcamImage.imageAsDataUrl;
    this.isFile = true;
  }
  onKeep(e){

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
          
          var reader = new FileReader();

          reader.readAsDataURL(file); // read file as data url
    
          reader.onload = (event:any) => { // called once readAsDataURL is completed
    
     
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
 
      }
    }
  }else{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed

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

  }
 
  public fileLeave(event){

  }


  onSubmit(){
    this.profileQuestions.filter((q)=>{
      if(q.SettingValueTypeName === "Picture"){
        q.Answer =  this.imageurl
      }
    })

    let visitorProfile = {
      preRegisterData:this.preRegForm.value,
      profileData:this.allProfileQuestions,
      visitorUploadedImage:this.imageurl,
      host: this.host,
      visitor: this.visitor,
      isPreRegisters:this.isPreRegisters
    }
   
    this.mannedVisitorMangementService.setVisitorProfile(visitorProfile)
    this.route.navigate(['/mannedvisitormanagement/visitor-confirmation'])
  }

  onSelect(e, q, fromMain){
    if(e.NextQuestionSys === 41538){
      return;
    }
    if(e.NextQuestionSys === -2){
      let element:HTMLElement = document.getElementById('cancelSignin') as HTMLElement;
        return element.click();
    }
    if(fromMain){
      this.choosedQuestionsArray = []
    }
    
     let option= this.allProfileQuestions.find((question)=>question.QuestionSys === e.NextQuestionSys)
       console.log(option)
      
     this.selectedQuestion = {
       option:option,
       questionsys:q
     }
      let hasAlreadyExist = this.choosedQuestionsArray.find((xxu)=>xxu.questionsys === q)
      let hasAlreadyExis1t = this.choosedQuestionsArray.find((xxu)=>xxu.questionsys === e.NextQuestionSys)
       if( !hasAlreadyExis1t){
        this.choosedQuestionsArray.push(this.selectedQuestion)
       }else{
        // this.choosedQuestionsArray = this.choosedQuestionsArray.filter((xxy)=>xxy.questionsys != q)
        // this.choosedQuestionsArray.push(this.selectedQuestion)
      }
      if(!option.Required && option.SettingValueTypeName == "String"){
          //push next question too in que
          let NextQuestionSys = option.Decisions[0].NextQuestionSys
          if(NextQuestionSys === 41538){
            return
          }
          let next= this.allProfileQuestions.find((question)=>question.QuestionSys === NextQuestionSys)
          let nextQuestion = {
            option:next,
            questionsys:NextQuestionSys
          }
          this.choosedQuestionsArray.push(nextQuestion)
      }
  }
  cancelSignin(){
    let element:HTMLElement = document.getElementById('terminate') as HTMLElement;
     element.click();
    this.route.navigate(['/watchlist'])
  }
  onSelectNoSignin(){
    let element:HTMLElement = document.getElementById('terminate') as HTMLElement;
     element.click();

  }

}

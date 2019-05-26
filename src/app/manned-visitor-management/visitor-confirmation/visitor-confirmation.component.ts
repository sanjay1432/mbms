import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../services/watchlist.service';
@Component({
  selector: 'app-visitor-confirmation',
  templateUrl: './visitor-confirmation.component.html',
  styleUrls: ['./visitor-confirmation.component.css']
})
export class VisitorConfirmationComponent implements OnInit {
  preRegData:any;
  profileData:any;
  visitor:any;
  host:any;
  yesClass = 'yes';
  noClass  = 'no';
  visitorProfile: any;
  imageurl: any;
  isPreRegisters: any;
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService,
              private _location:Location,
              private router: Router,
              private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.mannedVisitorMangementService.getVisitorProfile()
                                      .subscribe((profile)=> 
                                       {
                                         this.visitorProfile = profile
                                         this.preRegData = profile.preRegisterData,
                                         profile.profileData.filter((q)=>{
                                          if(q.SettingValueTypeName === "Picture"){
                                            this.imageurl = q.Answer  
                                          }
                                          return q.SettingValueTypeName !== 'Picture';
                                         })
                                         this.profileData = profile.profileData
                                         console.log(this.profileData)
                                         this.host = profile.host
                                         this.visitor = profile.visitor
                                         this.isPreRegisters = profile.isPreRegisters
                                       })
  }

  printBadge(value){
    if(value  === 'yes'){
      this.yesClass = value
      this.noClass = 'no'
     
    }else if(value  === 'no'){
      this.yesClass = value
      this.noClass = 'yes'
    
    }
    
  }

  back(){
    this._location.back();
  }

  onConfirm(){
    let visitorSignin = {
      Action: "IN",
      OrganizationSys: 0,
      ContactSys: 0,
      GuestName: '',
      CompanyName: '',
      IsPreRegistering: true,
      PreRegistrationStartDate: '',
      PreRegistrationEndDate: '',
      ToSeeContactSys: 0,
      ToSeeGroupSys: 0,
      DOB: '',
      ClientTimeStampStr: Date.now(),
      Answer: [],
      EmailAddress: '',
      PhoneNo: '',
      ImageSys: 0,
      PhotoLocation: '',
      SmallPhotoLocation: ''
    }
    visitorSignin.ContactSys = this.visitor.ContactSys?this.visitor.ContactSys:0;
    visitorSignin.GuestName = this.visitor.FirstName + this.visitor.LastName;
    visitorSignin.CompanyName = this.visitor.Company;
    visitorSignin.PreRegistrationStartDate = this.preRegData.startDate;
    visitorSignin.PreRegistrationEndDate = this.preRegData.endDate;
    let dobObj = this.profileData.find((pro)=>pro.MappedColumnName ==='DOB')
    visitorSignin.DOB = dobObj?dobObj.Answer:'';
    visitorSignin.EmailAddress = this.visitor.EmailAddress;
    visitorSignin.IsPreRegistering = this.isPreRegisters
    visitorSignin.PhoneNo = this.visitor.Phone
    visitorSignin.Answer = this.profileData
    if(this.visitor.ImageSys != 0){
      visitorSignin.ImageSys = this.visitor.ImageSys
      visitorSignin.PhotoLocation = this.visitor.PhotoLocation
      visitorSignin.SmallPhotoLocation = this.visitor.SmallPhotoLocation 
    }else{
      if(this.imageurl){
        this.watchlistService.upload(this.imageurl).subscribe((data)=>{
          let image = JSON.parse(JSON.stringify(data))
          visitorSignin.ImageSys = image.Data.ImageSys
          visitorSignin.PhotoLocation = image.Data.PhotoLocation
          visitorSignin.SmallPhotoLocation =  image.Data.SmallPhotoLocation
        })
      }
    }

    let visitor;
    if(this.isPreRegisters){
      this.mannedVisitorMangementService.updateAPIVisitors(visitorSignin, this.visitor.ContactSys).subscribe((data)=>{
            console.log(data)
      })
    }else{
      this.mannedVisitorMangementService.saveAPIVisitors(visitorSignin).subscribe((data)=>{
        console.log(data)
      })
    }
   this.mannedVisitorMangementService.setFinalVisitor(this.visitorProfile)
   this.router.navigate(['printbadge'])
  }

}

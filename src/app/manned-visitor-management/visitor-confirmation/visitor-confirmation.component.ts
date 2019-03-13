import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService,
              private _location:Location,
              private router: Router) { }

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
                                         this.host = profile.host
                                         this.visitor = profile.visitor
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
   this.mannedVisitorMangementService.setFinalVisitor(this.visitorProfile)
   this.router.navigate(['printbadge'])
  }

}

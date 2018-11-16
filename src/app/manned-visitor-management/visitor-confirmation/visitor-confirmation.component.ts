import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
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
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService,
              private _location:Location) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.mannedVisitorMangementService.getVisitorProfile()
                                      .subscribe((profile)=> 
                                       {
                                         this.preRegData = profile.preRegisterData,
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

}

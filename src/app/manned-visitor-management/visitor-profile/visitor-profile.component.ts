import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
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

  preRegForm = this.fb.group({
    email: [''],
    phone: [''],
    startDate: [''],
    startTime: [''],
    endDate: [''],
    endTime: ['']
  });
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
  

}

import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.component.html',
  styleUrls: ['./visitor-profile.component.css']
})
export class VisitorProfileComponent implements OnInit {
  isPreRegisters: boolean;
  visitor: any;
  questions:any = [
    'What visitor category does person belongs to?',
    'What is the purpose of visit?',
    "What is visitor's favourite food?",
    "What is visitor's email address?"
  ];
  visitorCategory = ['Contractor','Developer','Designer','Broker','Politician'];
  constructor(private mannedVisitorMangementService: MannedVisitorMangementService,
              private _location: Location) { }

  ngOnInit() {
   this.mannedVisitorMangementService.getVisitor().subscribe(v => {
    console.log(v)
    this.isPreRegisters = v.isPreRegistered;
    this.visitor = v.profile;
    })
  }

  back(){
    this._location.back();
  }

}

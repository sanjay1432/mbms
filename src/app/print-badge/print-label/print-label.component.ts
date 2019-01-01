import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-print-label',
  templateUrl: './print-label.component.html',
  styleUrls: ['./print-label.component.css']
})
export class PrintLabelComponent implements OnInit {
  printers = ['printer1','printer2','printer3']
  constructor(private mannedVisitorMangementService:MannedVisitorMangementService) { }

  ngOnInit() {
    this.mannedVisitorMangementService.getVisitorProfile()
    .subscribe((profile)=> 
     {
       console.log(profile)
      //  this.preRegData = profile.preRegisterData,
      //  this.profileData = profile.profileData
      //  this.host = profile.host
      //  this.visitor = profile.visitor
     })
  }

}

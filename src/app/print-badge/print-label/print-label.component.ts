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
  groups = ['Contractor 1','Contractor 2','Day Visitor','Delivery Person','Long Term Visitor']
  selectedItem: any = this.groups[0];
  visitor: any;
  constructor(private mannedVisitorMangementService:MannedVisitorMangementService) { }

  ngOnInit() {
   this.visitor =  this.mannedVisitorMangementService.getFinalVisitor()
  }

  listClick(event, newValue) {
    this.selectedItem = newValue; 
}
}

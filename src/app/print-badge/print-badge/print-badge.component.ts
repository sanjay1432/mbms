import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { PrinterService } from '../../services/printer.service';
@Component({
  selector: 'app-print-badge',
  templateUrl: './print-badge.component.html',
  styleUrls: ['./print-badge.component.css']
})
export class PrintBadgeComponent implements OnInit {

  printers = ['printer1','printer2','printer3']
  groups = ['Contractor 1','Contractor 2','Day Visitor','Delivery Person','Long Term Visitor']
  selectedItem: any = this.groups[0];
  visitor: any;

  yesBadge = 'yes';
  noBadge  = 'no';
 
  constructor(private mannedVisitorMangementService:MannedVisitorMangementService, private printService: PrinterService) { }

  ngOnInit() {
    console.log('Printer List!!!!!!!!!!')
    console.log(this.printService.getPrinters());
   this.visitor =  this.mannedVisitorMangementService.getFinalVisitor()
  let isActive = this.mannedVisitorMangementService.getPrintBadgeState()
    if(isActive == 'yes'){
      this.yesBadge = 'yes'
      this.noBadge  = 'no';
    }else{
      this.yesBadge = 'no'
      this.noBadge  = 'yes';
    }
  }

  printBadge(value){
    if(value  === 'yes'){
      this.yesBadge = value
      this.noBadge = 'no'
     
    }else if(value  === 'no'){
      this.yesBadge = value
      this.noBadge = 'yes'
    
    }
    
  }

  listClick(event, newValue) {
      this.selectedItem = newValue; 
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-activate-badge',
  templateUrl: './print-activate-badge.component.html',
  styleUrls: ['./print-activate-badge.component.css']
})
export class PrintActivateBadgeComponent implements OnInit {
  yesLabel = 'yes';
  noLabel  = 'no';

  yesBadge = 'yes';
  noBadge  = 'no';

  yesBadgeAssign = 'yes';
  noBadgeAssign  = 'no';
  isGo: boolean = false;
  isPrintLabel:boolean = false;
  constructor() { }

  ngOnInit() {
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
  printLabel(value){
    if(value  === 'yes'){
      this.yesLabel = value
      this.noLabel = 'no'
     
    }else if(value  === 'no'){
      this.yesLabel = value
      this.noLabel = 'yes'
    
    }
  }
  printBadgeAssign(value){
    if(value  === 'yes'){
      this.yesBadgeAssign = value
      this.noBadgeAssign = 'no'
     
    }else if(value  === 'no'){
      this.yesBadgeAssign = value
      this.noBadgeAssign = 'yes'
    
    }
  }

  onPrintLabel(){
    this.isGo = true;
    this.isPrintLabel = true;

  }

}

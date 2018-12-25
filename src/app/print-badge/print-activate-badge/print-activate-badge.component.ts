import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-activate-badge',
  templateUrl: './print-activate-badge.component.html',
  styleUrls: ['./print-activate-badge.component.css']
})
export class PrintActivateBadgeComponent implements OnInit {
  yesClass = 'yes';
  noClass  = 'no';
  constructor() { }

  ngOnInit() {
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

}

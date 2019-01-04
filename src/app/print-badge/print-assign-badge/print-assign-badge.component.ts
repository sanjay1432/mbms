import { Component, OnInit } from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-print-assign-badge',
  templateUrl: './print-assign-badge.component.html',
  styleUrls: ['./print-assign-badge.component.css']
})
export class PrintAssignBadgeComponent implements OnInit {
  visitor: any;
  yesBadge = 'no';
  noBadge  = 'yes';
  ActiavteBadgeForm = this.fb.group({
    startDate: [''],
    startTime: [''],
    endDate: [''],
    endTime: ['']
  });

  integerations = ['Access Control Integrtion from Database'];
  groups = ['ACI Security Groups Populated Dynamically']
  disabled: boolean;
  selectedIntigration:string;
  constructor(private mannedVisitorMangementService:MannedVisitorMangementService,private fb: FormBuilder) { }

  ngOnInit() {
    this.visitor =  this.mannedVisitorMangementService.getFinalVisitor()
    if(this.yesBadge == 'no'){
      this.disabled = true
    }else{
      this.disabled = false
    }

  }

  printBadge(value){
    if(value  === 'yes'){
      this.yesBadge = value
      this.noBadge = 'no'
      this.disabled = false
    }else if(value  === 'no'){
      this.yesBadge = value
      this.noBadge = 'yes'
      this.disabled = true
    }
    
  }

  onSubmit(){
    if(!this.selectedIntigration){
      let element:HTMLElement = document.getElementById('isSelectedIntigration') as HTMLElement;
      element.click();
    }
  }
}

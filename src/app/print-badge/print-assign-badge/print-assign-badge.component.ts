import { Component, OnInit ,EventEmitter, Input, Output} from '@angular/core';
import { MannedVisitorMangementService } from '../../services/manned-visitor-mangement.service';
import { FormBuilder } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
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
  @Output() cancel = new EventEmitter<boolean>();
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private mannedVisitorMangementService:MannedVisitorMangementService,private fb: FormBuilder) {

    iconRegistry.addSvgIcon(
      'calendar',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/calendar-icon.svg'));
  }

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
    if(!this.selectedIntigration && this.yesBadge == 'yes'){
      let element:HTMLElement = document.getElementById('isSelectedIntigration') as HTMLElement;
      element.click();
    }
  }

  onEnable(){
    this.selectedIntigration = this.integerations[0]
    let element:HTMLElement = document.getElementById('close') as HTMLElement;
      element.click();
  }

  onCancel(){
    this.cancel.emit(true);
  }
}

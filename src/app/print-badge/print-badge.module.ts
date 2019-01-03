import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintActivateBadgeComponent } from './print-activate-badge/print-activate-badge.component';
import { PrintBadgeRoutingModule } from './print-badge-routing.module';
import { PrintLabelComponent } from './print-label/print-label.component';
import { PrintBadgeComponent } from './print-badge/print-badge.component';
import { PrintAssignBadgeComponent } from './print-assign-badge/print-assign-badge.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MannedVisitorMangementService } from '../services/manned-visitor-mangement.service';
@NgModule({
  imports: [
    CommonModule,
    PrintBadgeRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule
  ],
  declarations: [PrintActivateBadgeComponent, PrintLabelComponent, PrintBadgeComponent, PrintAssignBadgeComponent],
  providers   : [
    MannedVisitorMangementService
  ]
})
export class PrintBadgeModule { }

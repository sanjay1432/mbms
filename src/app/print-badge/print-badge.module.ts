import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintActivateBadgeComponent } from './print-activate-badge/print-activate-badge.component';
import { PrintBadgeRoutingModule } from './print-badge-routing.module';
import { PrintLabelComponent } from './print-label/print-label.component';
import { PrintBadgeComponent } from './print-badge/print-badge.component';
import { PrintAssignBadgeComponent } from './print-assign-badge/print-assign-badge.component';
@NgModule({
  imports: [
    CommonModule,
    PrintBadgeRoutingModule
  ],
  declarations: [PrintActivateBadgeComponent, PrintLabelComponent, PrintBadgeComponent, PrintAssignBadgeComponent]
})
export class PrintBadgeModule { }

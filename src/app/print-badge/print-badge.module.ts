import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintActivateBadgeComponent } from './print-activate-badge/print-activate-badge.component';
import { PrintBadgeRoutingModule } from './print-badge-routing.module';
@NgModule({
  imports: [
    CommonModule,
    PrintBadgeRoutingModule
  ],
  declarations: [PrintActivateBadgeComponent]
})
export class PrintBadgeModule { }

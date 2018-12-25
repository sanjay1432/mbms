import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintActivateBadgeComponent } from './print-activate-badge/print-activate-badge.component';
const routes: Routes = [
   { path: '', component: PrintActivateBadgeComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PrintBadgeRoutingModule {}

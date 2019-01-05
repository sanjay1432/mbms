import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintActivateBadgeComponent } from './print-activate-badge/print-activate-badge.component';
import { BatchPrintComponent } from './batch-print/batch-print.component';
const routes: Routes = [
   { path: '', component: PrintActivateBadgeComponent },
   { path: 'batch-print', component: BatchPrintComponent  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PrintBadgeRoutingModule {}

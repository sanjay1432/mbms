import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindVisitorComponent } from './find-visitor/find-visitor.component';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
import { VisitorConfirmationComponent } from './visitor-confirmation/visitor-confirmation.component';
const routes: Routes = [
   { path: '', component: FindVisitorComponent },
   { path: 'visitor', component: VisitorProfileComponent },
   { path: 'visitor-confirmation', component: VisitorConfirmationComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MVMRoutingModule {}

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindVisitorComponent } from './find-visitor/find-visitor.component';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
const routes: Routes = [
   { path: '', component: FindVisitorComponent },
   { path: 'visitor', component: VisitorProfileComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MVMRoutingModule {}

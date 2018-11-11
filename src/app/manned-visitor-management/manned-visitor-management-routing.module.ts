import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindVisitorComponent } from './find-visitor/find-visitor.component';
const routes: Routes = [
   { path: '', component: FindVisitorComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MVMRoutingModule {}

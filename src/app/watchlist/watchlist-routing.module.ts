import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistpageComponent } from './watchlistpage/watchlistpage.component';

const routes: Routes = [
  { path: '', component: WatchlistpageComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WatchlistRoutingModule {}

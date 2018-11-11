import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/watchlist', pathMatch: 'full' },
  {
    path: 'watchlist',
    loadChildren: './watchlist/watchlist.module#WatchlistModule'
  },
  {
    path: 'mannedvisitormanagement',
    loadChildren: './manned-visitor-management/manned-visitor-management.module#MannedVisitorManagementModule'
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

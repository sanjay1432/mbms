import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService }  from '../in-memory-data.service';
import { WatchlistpageComponent } from './watchlistpage/watchlistpage.component';
import { AddtowatchlistComponent } from './addtowatchlist/addtowatchlist.component';
import { WatchlistService } from '../services/watchlist.service';
@NgModule({
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false // return entity after PUT/update
      }
  )

  ],
  
  declarations: [WatchlistpageComponent, AddtowatchlistComponent],
  providers   : [
    WatchlistService
  ]
})
export class WatchlistModule { }

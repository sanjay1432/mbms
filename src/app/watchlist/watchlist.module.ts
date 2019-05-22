import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService }  from '../in-memory-data.service';
import { WatchlistpageComponent } from './watchlistpage/watchlistpage.component';
import { AddtowatchlistComponent } from './addtowatchlist/addtowatchlist.component';
import { WatchlistService } from '../services/watchlist.service';
import { PossibleMatchComponent } from './possible-match/possible-match.component';
import { EdituserComponent } from './edituser/edituser.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatProgressBarModule} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileDropModule,
    MatTableModule,
    MatSortModule,
    NgbModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false // return entity after PUT/update
      }
  )

  ],
  
  declarations: [WatchlistpageComponent, AddtowatchlistComponent, PossibleMatchComponent, EdituserComponent],
  providers   : [
    WatchlistService
  ]
})
export class WatchlistModule { }

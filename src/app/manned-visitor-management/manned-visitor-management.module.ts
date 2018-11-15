import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MVMRoutingModule } from './manned-visitor-management-routing.module';
import { InMemoryDataService }  from '../in-memory-data.service';
import { WatchlistService } from '../services/watchlist.service';
import { MannedVisitorMangementService } from '../services/manned-visitor-mangement.service';
import { FindVisitorComponent } from './find-visitor/find-visitor.component';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';
import { SelectHostComponent } from './select-host/select-host.component';
import {WebcamModule} from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { AppCameraComponent } from './app-camera/app-camera.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FileDropModule,
    MVMRoutingModule,
    NgbModule,
    WebcamModule,
    HttpClientInMemoryWebApiModule.forFeature(
      InMemoryDataService,{
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false // return entity after PUT/update
      }
    )

  ],
  declarations: [FindVisitorComponent, VisitorProfileComponent, SelectHostComponent, AppCameraComponent],
  providers   : [
    WatchlistService,MannedVisitorMangementService
  ]
})
export class MannedVisitorManagementModule { }

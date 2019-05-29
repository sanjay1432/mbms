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
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule}  from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { VisitorConfirmationComponent } from './visitor-confirmation/visitor-confirmation.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule,MatProgressBarModule} from '@angular/material';
import { CustomeLoaderComponent } from './custome-loader/custome-loader.component';
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxMaterialTimepickerModule.forRoot(),
    HttpClientInMemoryWebApiModule.forFeature(
      InMemoryDataService,{
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false // return entity after PUT/update
      }
    )

  ],
  entryComponents :[CustomeLoaderComponent],
  declarations: [FindVisitorComponent, VisitorProfileComponent, SelectHostComponent, AppCameraComponent, VisitorConfirmationComponent, CustomeLoaderComponent],
  providers   : [
    WatchlistService,MannedVisitorMangementService,MatDatepickerModule
  ],
  
})
export class MannedVisitorManagementModule { }

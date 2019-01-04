import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintActivateBadgeComponent } from './print-activate-badge/print-activate-badge.component';
import { PrintBadgeRoutingModule } from './print-badge-routing.module';
import { PrintLabelComponent } from './print-label/print-label.component';
import { PrintBadgeComponent } from './print-badge/print-badge.component';
import { PrintAssignBadgeComponent } from './print-assign-badge/print-assign-badge.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MannedVisitorMangementService } from '../services/manned-visitor-mangement.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule}  from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
@NgModule({
  imports: [
    CommonModule,
    PrintBadgeRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxMaterialTimepickerModule.forRoot(),

  ],
  declarations: [PrintActivateBadgeComponent, PrintLabelComponent, PrintBadgeComponent, PrintAssignBadgeComponent],
  providers   : [
    MannedVisitorMangementService
  ]
})
export class PrintBadgeModule { }

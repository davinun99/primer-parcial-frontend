import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Services
import { AccountService } from './services/account.service';
import { CategoryService } from './services/category.service';
import { ServiceService } from './services/service.service';
import { PatientService } from './services/patient.service';
import { DoctorService } from './services/doctor.service';
import { HoursService } from './services/hours.service';
import { ExceptionalHourService } from './services/exceptionalhour.service';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './layouts/main/main.component';
import { RecordComponent } from './components/record/record.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import { CategoryComponent } from './components/category/category.component';
import { TitledInputComponent } from './components/includes/titled-input/titled-input.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { BackModalComponent } from './components/includes/back-modal/back-modal.component';
import { ConfigComponent } from './components/config/config.component';
import { ServiceComponent } from './components/service/service.component';
import { FullPageModalComponent } from './components/includes/full-page-modal/full-page-modal.component';
import { PatientComponent } from './components/patient/patient.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HoursComponent } from './components/hours/hours.component';
import { ExceptionalHourComponent } from './components/exceptionalhour/exceptionalhour.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportService } from './services/reports.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatTableModule } from '@angular/material/table/table-module';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { RegistrarFacturaComponent } from './components/factura/registrar-factura.component';
import { FacturaService } from './services/factura.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    RecordComponent,
    ReservationComponent,
    CategoryComponent,
    TitledInputComponent,
    SubCategoryComponent,
    BackModalComponent,
    ConfigComponent,
    ServiceComponent,
    FullPageModalComponent,
    PatientComponent,
    DoctorComponent,
    HoursComponent,
    ExceptionalHourComponent,
    ReportsComponent,
    RegistrarFacturaComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule, 
    MatTableExporterModule,
    
  ],
  providers: [
    AccountService,
    CategoryService,
    ServiceService,
    PatientService,
    DoctorService,
    HoursService,
    ExceptionalHourComponent,
    ReportService,
    FacturaService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

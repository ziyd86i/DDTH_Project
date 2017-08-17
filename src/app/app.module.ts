//Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }   from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

//Service
import { ServiceService } from './service.service';
import { ManagedService } from './admin/managed.service';
import { TicketService } from './resource/ticket/ticket.service';


//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResourceComponent } from './resource/resource.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderCmComponent } from './resource/header-cm/header-cm.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { EngineerComponent } from './engineer/engineer.component';
import { HeaderEnComponent } from './engineer/header-en/header-en.component';
import { BodyAdminComponent } from './admin/body-admin/body-admin.component';
import { EmployeesDataComponent } from './admin/body-admin/employees-data/employees-data.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { BodyCmComponent } from './resource/body-cm/body-cm.component';
import { SearchTectComponent } from './resource/body-cm/search-tect/search-tect.component';
import { StatusComponent } from './resource/body-cm/status/status.component';
import { TicketComponent } from './resource/ticket/ticket.component';
import { BodyTicketComponent } from './resource/ticket/body-ticket/body-ticket.component';
import { FormTicketComponent } from './resource/ticket/form-ticket/form-ticket.component';


import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';

import 'rxjs';

import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'bootstrap-timepicker/css/bootstrap-timepicker.min.css';
import 'bootstrap-timepicker/js/bootstrap-timepicker.js';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResourceComponent,
    AdminComponent,
    HeaderCmComponent,
    HeaderAdminComponent,
    EngineerComponent,
    HeaderEnComponent,
    BodyAdminComponent,
    EmployeesDataComponent,
    AdduserComponent,
    BodyCmComponent,
    SearchTectComponent,
    StatusComponent,
    TicketComponent,
    BodyTicketComponent,
    FormTicketComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NKDatetimeModule,





  ],
  providers: [
              ServiceService,
              ManagedService,DatePipe,
              TicketService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

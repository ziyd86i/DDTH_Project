//Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }   from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

//Service
import { AuthCmGuard } from './login/_guard/auth_cm.guard';
import { AuthAdminGuard } from './login/_guard/auth_admin.guard';
import { AuthEngineerGuard } from './login/_guard/auth_engineer.guard';
import { ManagedService } from './admin/managed.service';
import { TicketService } from './resource/ticket/ticket.service';
import { LoginService } from './login/login.service';
import { AlertService } from './login/_service/alert.service';
import { AuthenticationService } from './login/_service/authentication.service';


//Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResourceComponent } from './resource/resource.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderCmComponent } from './resource/header-cm/header-cm.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { EngineerComponent } from './engineer/engineer.component';
import { HeaderEnComponent } from './engineer/header-en/header-en.component';
import { BodyEnComponent } from './engineer/body-en/body-en.component';
import { BodyAdminComponent } from './admin/body-admin/body-admin.component';
import { EmployeesDataComponent } from './admin/body-admin/employees-data/employees-data.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { BodyCmComponent } from './resource/body-cm/body-cm.component';
import { SearchTectComponent } from './resource/body-cm/search-tect/search-tect.component';
import { StatusComponent } from './resource/body-cm/status/status.component';
import { TicketComponent } from './resource/ticket/ticket.component';
import { BodyTicketComponent } from './resource/ticket/body-ticket/body-ticket.component';
import { FormTicketComponent } from './resource/ticket/form-ticket/form-ticket.component';




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
    BodyEnComponent,


  ],
  imports: [
    NKDatetimeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    NguiDatetimePickerModule,


  ],
  providers: [
              AuthCmGuard,
              AuthEngineerGuard,
              AuthAdminGuard,
              LoginService,
              ManagedService,
              DatePipe,
              TicketService,
              AlertService,
              AuthenticationService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

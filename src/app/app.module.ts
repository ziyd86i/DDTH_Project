//Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdDialogModule, MdCardModule, MdButtonModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }   from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
         DxSchedulerModule,
         DxDataGridModule,
         DxSelectBoxModule,
         DxCheckBoxModule,
         DxButtonModule,
         DxDateBoxModule } from 'devextreme-angular';


//Service
import { AuthCmGuard } from './login/_guard/auth_cm.guard';
import { AuthAdminGuard } from './login/_guard/auth_admin.guard';
import { AuthEngineerGuard } from './login/_guard/auth_engineer.guard';
import { ManagedService } from './admin/managed.service';
import { TicketService } from './resource/ticket/ticket.service';
import { LoginService } from './login/login.service';
import { AlertService } from './login/_service/alert.service';
import { AuthenticationService } from './login/_service/authentication.service';
import { EngineerService } from './engineer/engineer.service';
import { ResourceService } from './resource/resource.service';



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
import { StatusComponent } from './resource/body-cm/status/status.component';
import { TicketComponent } from './resource/ticket/ticket.component';
import { BodyTicketComponent } from './resource/ticket/body-ticket/body-ticket.component';
import { FormTicketComponent } from './resource/ticket/form-ticket/form-ticket.component';
import { EngDataComponent } from './engineer/body-en/eng-data/eng-data.component';
import { EngWorkplanComponent } from './engineer/eng-workplan/eng-workplan.component';
import { EngDialogComponent } from './engineer/eng-workplan/eng-dialog/eng-dialog.component';
import { DialogDetails } from './engineer/body-en/eng-data/dialog-detials/dialog-detials.component';
import { DialogDone } from './engineer/body-en/eng-data/dialog-done/dialog-done.component';
import { DoneDialog } from './resource/body-cm/status/done-dialog/done-dialog.component';
import { AssignDialog } from './resource/body-cm/status/assign-dialog/assign-dialog.component';
import { DelDialog } from './resource/body-cm/status/del-dialog/del-dialog.component';
import { DescDialog } from './resource/body-cm/status/desc-dialog/desc-dialog.component';
import { WorkplanCmComponent } from './resource/workplan-cm/workplan-cm.component';




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
    StatusComponent,
    TicketComponent,
    BodyTicketComponent,
    FormTicketComponent,
    BodyEnComponent,
    EngDataComponent,
    DialogDetails,
    EngWorkplanComponent,
    EngDialogComponent,
    DialogDone,
    DoneDialog,
    AssignDialog,
    DelDialog,
    DescDialog,
    WorkplanCmComponent,




  ],
  entryComponents: [
    DialogDone,
    DialogDetails,
    EngDialogComponent,
    DoneDialog,
    AssignDialog,
    DelDialog,
    DescDialog,

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
    MdDialogModule,
    MdCardModule,
    MdButtonModule,
    BrowserAnimationsModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxSchedulerModule,
    DxDateBoxModule,


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
              AuthenticationService,
              EngineerService,
              ResourceService,

            ],
  bootstrap: [AppComponent]
})
export class AppModule { }

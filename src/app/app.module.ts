import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule }   from './app-routing.module';
import { ServiceService } from './service.service';
import { ManagedService } from './admin/managed.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { SearchTecniqueComponent } from './body/search-tecnique/search-tecnique.component';
import { StatusComponent } from './body/status/status.component';
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







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    SearchTecniqueComponent,
    StatusComponent,
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



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,




  ],
  providers: [ServiceService,ManagedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

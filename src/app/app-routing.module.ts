import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResourceComponent } from './resource/resource.component';
import { AdminComponent } from './admin/admin.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { TicketComponent } from './resource/ticket/ticket.component';
import { FormTicketComponent } from './resource/ticket/form-ticket/form-ticket.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cm', component: ResourceComponent },
  { path: 'cm/ticket', component: TicketComponent },
  { path: 'cm/ticket/addnew', component: FormTicketComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/adduser', component: AdduserComponent },
  { path: 'admin/:id', component: AdduserComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}

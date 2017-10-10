import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResourceComponent } from './resource/resource.component';
import { AdminComponent } from './admin/admin.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { TicketComponent } from './resource/ticket/ticket.component';
import { FormTicketComponent } from './resource/ticket/form-ticket/form-ticket.component';
import { WorkplanCmComponent } from './resource/workplan-cm/workplan-cm.component';

import { EngineerComponent } from './engineer/engineer.component';
import { EngWorkplanComponent } from './engineer/eng-workplan/eng-workplan.component';
import { AuthCmGuard } from './login/_guard/auth_cm.guard';
import { AuthAdminGuard } from './login/_guard/auth_admin.guard';
import { AuthEngineerGuard } from './login/_guard/auth_engineer.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cm', component: ResourceComponent, canActivate: [AuthCmGuard] },
  { path: 'cm/ticket', component: TicketComponent, canActivate: [AuthCmGuard] },
  { path: 'cm/ticket/addnew', component: FormTicketComponent, canActivate: [AuthCmGuard] },
  { path: 'cm/ticket/:id', component: FormTicketComponent, canActivate: [AuthCmGuard] },
  { path: 'cm/workplan', component: WorkplanCmComponent, canActivate: [AuthCmGuard] },

  { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard]},
  { path: 'admin/adduser', component: AdduserComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/:id', component: AdduserComponent, canActivate: [AuthAdminGuard] },

  { path: 'eng', component: EngineerComponent, canActivate: [AuthEngineerGuard] },
  { path: 'eng/workplan', component: EngWorkplanComponent, canActivate: [AuthEngineerGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}

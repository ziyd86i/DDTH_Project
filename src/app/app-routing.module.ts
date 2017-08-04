import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ResourceComponent } from './resource/resource.component';
import { AdminComponent } from './admin/admin.component';
import { AdduserComponent } from './admin/adduser/adduser.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'cm', component: ResourceComponent },
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

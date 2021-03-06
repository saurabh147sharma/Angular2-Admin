import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { PdfComponent } from './pdf/pdf.component';
import { CsvComponent } from './csv/csv.component';
import { FileComponent } from './file/file.component';
import { NavComponent } from './nav/nav.component';

import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
 {
      path: '',
      component: LoginComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
  { path: 'dashboard', component: NavComponent,canActivate: [AuthGuard], children : [
    {
      path: '',
      component: DashboardComponent
    }
  ] },
  { path: 'manage-users', component: NavComponent,canActivate: [AuthGuard], children : [
    {
      path: '',
      component: UserComponent
    }
  ] },

  { path: 'edit-user', component: NavComponent,canActivate: [AuthGuard], children : [
    {
      path: '',
      component: UserDetailsComponent
    }
  ] },
  { path: 'users/edit/:id', component: NavComponent,canActivate: [AuthGuard], children : [
    {
      path: '',
      component: EditUserComponent
    }
  ] },

  { path: 'pdf', component: NavComponent,canActivate: [AuthGuard], children : [
    {
      path: '',
      component: PdfComponent
    }
  ] },

  { path: 'csv', component: NavComponent,canActivate: [AuthGuard], children : [
    {
      path: '',
      component: CsvComponent
    }
  ] },

  { path: 'file', component: NavComponent,canActivate: [AuthGuard], children : [
    {
      path: '',
      component: FileComponent
    }
  ] }
  
   
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
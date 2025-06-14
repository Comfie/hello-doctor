import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { UsersComponent } from './components/use-management/users/users.component';
import { AuditLogsComponent } from './components/audit-logs/audit-logs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RoleManagementComponent } from './components/use-management/role-management/role-management.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'role-management', component: RoleManagementComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'audit-logs', component: AuditLogsComponent },
    ],

  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SuperAdminRoutingModule {}

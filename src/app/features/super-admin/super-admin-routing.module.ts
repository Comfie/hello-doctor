import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/user-management/users/users.component';
import { AuditLogsComponent } from './components/audit-logs/audit-logs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RoleManagementComponent } from './components/user-management/role-management/role-management.component';
import { PrescriptionDetailsComponent } from './components/prescriptions/prescription-details/prescription-details.component';
import { PrescriptionsListComponent } from './components/prescriptions/prescriptions-list/prescriptions-list.component';
import { PharmaciesListComponent } from './components/pharmacies/pharmacies-list/pharmacies-list.component';
import { PharmacyCreateComponent } from './components/pharmacies/pharmacy-create/pharmacy-create.component';
import { PharmacyDetailsComponent } from './components/pharmacies/pharmacy-details/pharmacy-details.component';
import { ProfileComponent } from './components/profile/profile.component';

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
      { path: 'users/:id', component: UsersComponent },
      { path: 'pharmacies', component: PharmaciesListComponent },
      { path: 'pharmacies/create', component: PharmacyCreateComponent },
      { path: 'pharmacies/:id', component: PharmacyDetailsComponent },
      { path: 'prescriptions', component: PrescriptionsListComponent },
      { path: 'prescriptions/:id', component: PrescriptionDetailsComponent },
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

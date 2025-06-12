import { MainMemberModule } from './main-member.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '',
    component: AuthLayoutComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ]
})
export class MainMemberRoutingModule { }

import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HowItWorksComponent } from './features/public/how-it-works/how-it-works.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { LoginComponent } from './features/public/login/login.component';
import { RegistrationComponent } from './features/public/registration/registration.component';
import { FaqComponent } from './features/public/faq/faq.component';
import { LandingPageComponent } from './features/public/landing-page/landing-page.component';
import { FeaturesComponent } from './features/public/features/features.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {path: '', component: LandingPageComponent },
      {path: 'features', component: FeaturesComponent },
      {path: 'how-it-works', component: HowItWorksComponent },
      {path: 'faq', component: FaqComponent },
      {path: 'registration', component: RegistrationComponent },
      {path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'main-member',
    loadChildren: () =>
      import('./features/main-member/main-member.module').then((m) => m.MainMemberModule),
  },
  {
    path: 'super-admin',
    loadChildren: () =>
      import('./features/super-admin/super-admin.module').then((m) => m.SuperAdminModule),
  },
  // Fallback
  { path: '**', redirectTo: '' },
];

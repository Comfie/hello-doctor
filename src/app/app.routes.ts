import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HowItWorksComponent } from './features/public/how-it-works/how-it-works.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { LoginComponent } from './features/public/login/login.component';
import { RegistrationComponent } from './features/public/registration/registration.component';
import { FaqComponent } from './features/public/faq/faq.component';
import { LandingPageComponent } from './features/public/landing-page/landing-page.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {path: '', component: LandingPageComponent },
      {path: 'features', component: HowItWorksComponent },
      {path: 'how-it-works', component: HowItWorksComponent },
      {path: 'faq', component: FaqComponent },
      {path: 'registration', component: RegistrationComponent },
      {path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  // Fallback
  { path: '**', redirectTo: '' },
];

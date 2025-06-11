import { Routes } from '@angular/router';
import { HowItWorksComponent } from './core/components/unauthenticated/how-it-works/how-it-works.component';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadComponent: () =>
      import(
        './core/components/unauthenticated/landing-page/landing-page.component'
      ).then((m) => m.LandingPageComponent),
  },
  { path: 'how-it-works', component: HowItWorksComponent },
  {
    path: 'faq',
    loadComponent: () =>
      import('./core/components/unauthenticated/faq/faq.component').then(
        (m) => m.FaqComponent
      ),
  },
    { path: 'registration',
    loadComponent: () =>
      import(
        './core/components/unauthenticated/registration/registration.component'
      ).then((m) => m.RegistrationComponent),
  },
    {
    path: 'login',
    loadComponent: () =>
      import(
        './core/components/unauthenticated/login/login.component'
      ).then((m) => m.LoginComponent), 
    },
    {
      path: 'features',
      loadComponent: () =>
        import(
          './core/components/unauthenticated/features/features.component'
        ).then((m) => m.FeaturesComponent),   
    }
];

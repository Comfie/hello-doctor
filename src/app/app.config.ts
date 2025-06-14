import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { networkInterceptor } from './core/interceptors/network.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Configuration } from '../.../../generated/api';
import { environment } from '../environments/environments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([networkInterceptor])),
    provideHttpClient(),
    {
      provide: Configuration,
      useFactory: () => new Configuration({ basePath: environment.apiBaseUrl }),
    }
  ],
};

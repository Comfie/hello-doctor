import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ThemeService } from './app/core/services/theme.service';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    // Initialize theme service after app bootstrap
    const themeService = appRef.injector.get(ThemeService);
    themeService.init();
  })
  .catch((err) => console.error(err));

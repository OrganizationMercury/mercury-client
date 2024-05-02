import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/modules/app.config';
import { AppComponent } from './app/modules/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

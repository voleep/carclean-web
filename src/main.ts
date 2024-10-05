import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@carclean/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

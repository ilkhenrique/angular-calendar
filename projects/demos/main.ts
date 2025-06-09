import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { DemoAppComponent } from './app/demo-app.component';
import { DemoAppModule } from './app/demo-app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(DemoAppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(DemoAppModule)
  ]
}).catch((err) => console.log(err));

import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthentificationApiService } from './api-services/authentification.api-service';
import { xsrfTokenInterceptor } from './interceptors/xsrf-token.interceptor';

export function initApp(authService: AuthentificationApiService) {
  return () => firstValueFrom(authService.initCsrf());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        xsrfTokenInterceptor,
      ]),
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: initApp, // indique la fonction à executer
      deps: [AuthentificationApiService], // service injecter dans la fonction
      multi: true // permet d’avoir plusieurs APP_INITIALIZER
    }
  ]
};

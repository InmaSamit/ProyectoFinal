import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor';  // Asegúrate de poner la ruta correcta

export const appConfig: ApplicationConfig = {
  providers: [
      provideHttpClient(
        withInterceptors([AuthInterceptor])
      ),
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes)
  ]
};

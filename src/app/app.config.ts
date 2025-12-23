import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { timeoutInterceptor } from './core/interceptors/timeout.interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),

    // HTTP Client with Interceptors
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor,
        timeoutInterceptor,
        loadingInterceptor,
        errorHandlerInterceptor,
      ])
    ),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none',
        },
      },
      ripple: true,
    }),
    MessageService,
  ],
};

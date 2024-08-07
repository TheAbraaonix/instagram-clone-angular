import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AutenticacaoGuard } from './services/autenticacao-guard.service';
import { Autenticacao } from './services/autenticacao.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    AutenticacaoGuard,
    Autenticacao,
    provideAnimations()
  ]
};

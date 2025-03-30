import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { disableRipples } from '../configs/global-ripples.config'
import { provideHttpClient } from '@angular/common/http'
import { provideApollo } from 'apollo-angular'
import { apolloConfig, loadingOptions } from '../configs/apollo.config'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    disableRipples(),
    provideHttpClient(),
    // provideApollo(apolloConfig, loadingOptions),
  ],
}

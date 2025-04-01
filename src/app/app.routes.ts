import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './auth/login/login.component'
import { TournamentsComponent } from './tournaments/tournaments.component'
import { LeaguesComponent } from './leagues/leagues.component'
import { CounterComponent } from './counter/counter.component'
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { authGuard } from './auth/auth.guard'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'tournaments',
    component: TournamentsComponent,
  },
  {
    path: 'leagues',
    component: LeaguesComponent,
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
]

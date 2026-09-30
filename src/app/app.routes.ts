import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: 'researchtasks',
    title: 'page de recherche',
    loadComponent: () => import('./ui/research/research.component'),
    canActivate: [
      () => inject(AuthService).isLoggedIn(),
      () => inject(AuthService).isSearching(),
    ],
  },
  {
    path: 'home',
    title: 'page-accueil',
    loadComponent: () => import('./ui/home-page/home-page.component'),
  },
  {
    path: 'tasks',
    title: 'taches',
    loadComponent: () => import('./ui/taches/taches.component'),
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  {
    path: '404',
    title: 'page non trouvée',
    loadComponent: () => import('./ui/page-not-found/page-not-found.component'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

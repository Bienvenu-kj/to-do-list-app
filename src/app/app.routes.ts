import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: 'tasks/search',
    title: 'page de recherche',
    loadComponent: () =>
      import('./features/tasks/pages/task-search/task-search'),
    canActivate: [
      () => inject(AuthService).isLoggedIn(),
      () => inject(AuthService).isSearching(),
    ],
  },
  {
    path: 'researchtasks',
    pathMatch: 'full',
    redirectTo: 'tasks/search',
  },
  {
    path: 'home',
    title: 'page-accueil',
    loadComponent: () => import('./pages/home/home'),
  },
  {
    path: 'tasks',
    title: 'taches',
    loadComponent: () =>
      import('./features/tasks/pages/tasks/tasks'),
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  {
    path: '404',
    title: 'page non trouvée',
    loadComponent: () =>
      import('./pages/not-found/not-found'),
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

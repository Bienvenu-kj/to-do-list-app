import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: 'tasks/search',
    title: 'page de recherche',
    loadComponent: () =>
      import('./features/tasks/pages/task-search/task-search.component'),
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
    loadComponent: () => import('./pages/home-page/home-page.component'),
  },
  {
    path: 'tasks',
    title: 'taches',
    loadComponent: () =>
      import('./features/tasks/pages/tasks/tasks.component'),
    canActivate: [() => inject(AuthService).isLoggedIn()],
  },
  {
    path: '404',
    title: 'page non trouvée',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component'),
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

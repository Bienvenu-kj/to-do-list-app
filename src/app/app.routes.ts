import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from './services/Auth.service';

export const routes: Routes = [
    {
        path:'home',
        title:'page-accueil',
        loadComponent : ()=> import('./ui/home-page/home-page.component'),
    },
    {
        path:'tasks',
        title : 'taches',
        loadComponent : ()=> import('./ui/taches/taches.component'),
        canActivate: [()=>inject(AuthService).isLogin()],
    },
    {
        path:'404',
        title : 'page non trouvée',
        loadComponent : ()=> import('./ui/page-not-found/page-not-found.component'),
    },
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home',
    },
    {
        path:'**',
        redirectTo : '404'
    }
];

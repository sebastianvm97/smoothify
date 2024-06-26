import { Routes } from '@angular/router';
import { LandingComponent } from './components/public/landing/landing.component';
import { DashboardComponent } from './components/private/dashboard/dashboard.component';
import { isUserAuthGuardGuard } from './components/auth/routerGuards/is-user-auth-guard.guard';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'dashboard',
        canActivate: [isUserAuthGuardGuard],
        loadComponent: () => import('./components/private/dashboard/dashboard.component').then(m => m.DashboardComponent)
    }
];

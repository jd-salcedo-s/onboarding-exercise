import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login')
                .then(m => m.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./features/auth/signup/signup')
                .then(m => m.SignupComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/dashboard')
                .then(m => m.Dashboard)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
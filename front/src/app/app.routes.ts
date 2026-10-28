import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
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
        path: '',
        canActivateChild: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },
            {
                path: 'books',
                loadComponent: () =>
                    import('./features/books/books')
                        .then(m => m.BooksComponent)
            },
            {
                path: 'authors',
                loadComponent: () =>
                    import('./features/authors/authors')
                        .then(m => m.AuthorsComponent)
            },
            {
                path: 'genres',
                loadComponent: () =>
                    import('./features/genres/genres')
                        .then(m => m.GenreComponent)
            },
            {
                path: 'clients',
                loadComponent: () =>
                    import('./features/clients/clients')
                        .then(m => m.ClientComponent)
            },
            {
                path: 'staff',
                loadComponent: () =>
                    import('./features/staff/staff')
                        .then(m => m.StaffComponent)
            },
            {
                path: 'reservations',
                loadComponent: () =>
                    import('./features/reservations/reservations')
                        .then(m => m.ReservationsComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
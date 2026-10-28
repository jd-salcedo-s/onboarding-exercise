import { Component, inject } from "@angular/core";
import { CardComponent } from "../../shared/card/card.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";

interface DashboardCard {
    icon: string
    text: string
    link: string
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CardComponent, ButtonComponent],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard {
    private authService = inject(AuthService)
    private router = inject(Router)

    cards: DashboardCard[] = [
        {
            icon: 'menu_book',
            text: 'Books',
            link: '/books'
        },
        {
            icon: 'edit_note',
            text: 'Authors',
            link: '/authors'
        },
        {
            icon: 'category',
            text: 'Genres',
            link: '/genres'
        },
        {
            icon: 'groups',
            text: 'Clients',
            link: '/clients'
        },
        {
            icon: 'badge',
            text: 'Staff',
            link: '/staff'
        },
        {
            icon: 'event_note',
            text: 'Reservations',
            link: '/reservations'
        },
    ]

    onLogout() {
        this.authService.clearToken()
        void this.router.navigate(['/login'])
    }
}
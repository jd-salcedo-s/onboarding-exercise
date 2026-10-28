import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [RouterLink],
    template: `
        <main class="unauthorized">
            <h1>Access denied</h1>
            <p>You don’t have permission to view this page.</p>
            <a routerLink="/dashboard">Return to dashboard</a>
        </main>
    `,
    styles: [`
        :host { display: block; }
        .unauthorized { max-width: 560px; margin: 12vh auto; padding: 32px; text-align: center; }
        h1 { margin-bottom: 12px; }
        p { margin-bottom: 24px; }
    `]
})
export class UnauthorizedComponent {}

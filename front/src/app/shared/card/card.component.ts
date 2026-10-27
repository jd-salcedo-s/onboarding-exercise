import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [RouterLink, MatIconModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent {
    @Input({ required: true }) icon = ''
    @Input({ required: true }) text = ''
    @Input({ required: true }) link = ''
}
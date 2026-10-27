import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-form-container',
    standalone: true,
    styleUrl: './form-container.component.css',
    templateUrl: './form-container.component.html'
})
export class FormContainerComponent {
    @Input() title = ''
}
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
<button [type]="type" [style.background]="color">
      {{ text }}
</button>
  `,
  styles: `
    :host {
      display: block;
    }
 
    button {
      width: 100%;
      min-height: 48px;
      margin-top: 4px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
 
      background: var(--mat-sys-primary);
      color: var(--mat-sys-on-primary);
 
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.2px;
 
      box-shadow: 0 5px 14px rgba(0, 92, 187, 0.18);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }
 
    button:hover {
      box-shadow: 0 7px 18px rgba(0, 92, 187, 0.25);
      transform: translateY(-1px);
    }
 
    button:focus-visible {
      outline: 3px solid var(--mat-sys-secondary);
      outline-offset: 3px;
    }
 
    button:active {
      transform: translateY(0);
      box-shadow: none;
    }
  `,
})
export class ButtonComponent {
  @Input() color: string = 'var(--mat-sys-primary)';
  @Input() text: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
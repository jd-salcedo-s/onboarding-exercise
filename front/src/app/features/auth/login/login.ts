import { Component, inject, signal } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormContainerComponent } from '../../../shared/form-container/form-container.component';
import { AuthService } from '../../../core/auth.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ButtonComponent,
        FormContainerComponent,
    ],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    private authService = inject(AuthService)
    private router = inject(Router)

    loading = signal(false)
    error = signal('')
    passwordVisible = signal(false)

    onLogin() {
        if (this.loading()) return

        this.error.set('')

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched()
            return
        }

        this.loading.set(true)

        this.authService.login(this.loginForm.getRawValue()).pipe(finalize(() => {
            this.loading.set(false)
        }))
            .subscribe({
                next: () => {
                    void this.router.navigate(['/dashboard'])
                    localStorage.setItem('username', this.loginForm.value.username!)
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.error.set('Invalid credentials')
                    } else {
                        this.error.set('Could not sign in. Try again')
                    }
                }
            })
    }
}

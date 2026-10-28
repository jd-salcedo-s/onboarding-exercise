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
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormContainerComponent } from '../../../shared/form-container/form-container.component';
import { AuthService } from '../../../core/auth.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        ButtonComponent,
        FormContainerComponent,
    ],
    templateUrl: './signup.html',
    styleUrl: './signup.css',
})
export class SignupComponent {
    signupForm = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        role: new FormControl<'admin' | 'staff'>('admin', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    private authService = inject(AuthService)
    private router = inject(Router)

    loading = false
    error = ''
    passwordVisible = signal(false)

    onSignup() {
        if (this.loading) return

        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched()
            return
        }

        this.loading = true
        this.error = ''

        this.authService.signup(this.signupForm.getRawValue()).pipe(finalize(() => {
            this.loading = false
        }))
            .subscribe({
                next: response => {
                    if (response.token) {
                        void this.router.navigate(['/dashboard'])
                    } else {
                        void this.router.navigate(['/login'])
                    }
                },
                error: () => {
                    this.error = 'Could not create the account.'
                }
            })
    }
}

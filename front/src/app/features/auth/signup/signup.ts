import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormContainerComponent } from '../../../shared/form-container/form-container.component';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
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
        role: new FormControl<'admin' | 'staff'>('staff', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    onSignup() {
        console.log('Name:', this.signupForm.value.name)
        console.log('username: ', this.signupForm.value.username)
        console.log('pwd: ', this.signupForm.value.password)
        console.log('role: ', this.signupForm.value.role)
    }
}
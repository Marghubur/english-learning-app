import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    signupForm: FormGroup;
    loading = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        // Redirect to notes if already logged in
        if (this.authService.isAuthenticated) {
            this.router.navigate(['/notes']);
        }

        this.signupForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    get f() {
        return this.signupForm.controls;
    }

    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }
        return null;
    }

    onSubmit(): void {
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        const { confirmPassword, ...signupData } = this.signupForm.value;

        this.authService.signup(signupData).subscribe({
            next: () => {
                this.router.navigate(['/notes']);
            },
            error: (error) => {
                this.error = error.message || 'Signup failed. Please try again.';
                this.loading = false;
            }
        });
    }
}

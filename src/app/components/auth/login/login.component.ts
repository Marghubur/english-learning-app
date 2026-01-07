import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;
    error = '';
    returnUrl: string = '/notes';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // Redirect to notes if already logged in
        if (this.authService.isAuthenticated) {
            this.router.navigate(['/notes']);
        }

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // Get return url from route parameters or default to '/notes'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/notes';
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.router.navigate([this.returnUrl]);
            },
            error: (error) => {
                this.error = error.message || 'Login failed. Please check your credentials.';
                this.loading = false;
            }
        });
    }
}

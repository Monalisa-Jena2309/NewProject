import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  isLoading = false;
  message = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;
    this.message = '';
    this.errorMessage = '';

    this.authService.register(this.user).subscribe({
      next: res => {
        this.isLoading = false;
        this.message = '✅ Registered successfully!';
        this.errorMessage = '';
        this.user = { username: '', email: '', password: '' };
        form.resetForm();

        // go to login page
        this.router.navigate(['/login']);
      },
      error: err => {
        this.isLoading = false;

        // handle duplicate email (409 Conflict)
        if (err.status === 409) {
          this.errorMessage = '❌ This email already exists. Try logging in.';
        }
        // handle validation errors (400 Bad Request, backend sends field errors)
        else if (err.status === 400 && typeof err.error === 'object') {
          const messages = Object.values(err.error).join(' | ');
          this.errorMessage = `❌ ${messages}`;
        }
        // fallback
        else {
          this.errorMessage = '❌ Registration failed. Please try again.';
        }

        this.message = '';
        console.error('Registration error:', err);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

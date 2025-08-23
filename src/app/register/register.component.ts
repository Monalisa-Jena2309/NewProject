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

  // ✅ Inject Router here
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted!', this.user);

    // Simple validation
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.errorMessage = '❌ All fields are required!';
      this.message = '';
      return;
    }

    if (!this.validateEmail(this.user.email)) {
      this.errorMessage = '❌ Please enter a valid email!';
      this.message = '';
      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = '❌ Password must be at least 6 characters!';
      this.message = '';
      return;
    }

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

        // ✅ Navigate to login page after successful registration
        this.router.navigate(['/login']);
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || '❌ Registration failed. Please try again.';
        this.message = '';
        console.error('Registration error:', err);
      }
    });
  }

  // Email validation regex
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // ✅ Separate method in case you have a "Go to Login" button
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

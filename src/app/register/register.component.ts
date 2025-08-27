import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
      next: () => {
        this.isLoading = false;
        this.message = '✅ Registered successfully!';
        this.user = { username: '', email: '', password: '' };
        form.resetForm();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 409) {
          this.errorMessage = '❌ This email already exists. Try logging in.';
        } else if (err.status === 400 && typeof err.error === 'object') {
          const messages = Object.values(err.error).join(' | ');
          this.errorMessage = `❌ ${messages}`;
        } else {
          this.errorMessage = '❌ Registration failed. Please try again.';
        }
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

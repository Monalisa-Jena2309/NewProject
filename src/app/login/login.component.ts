import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  isLoading = false;
  message = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.message = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.message = '✅ Login successful!';
        this.errorMessage = '';
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = '❌ Invalid username or password.';
        } else {
          this.errorMessage = '❌ Login failed! Please try again.';
        }
        this.message = '';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

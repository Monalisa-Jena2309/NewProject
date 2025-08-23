import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';   // ⬅️ Add this

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],   // ⬅️ Include CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  isLoading = false;
  message = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (!form.valid) {
      this.errorMessage = '❌ All fields are required!';
      this.message = '';
      return;
    }

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
      error: () => {
        this.isLoading = false;
        this.errorMessage = '❌ Login failed! Please check username/password.';
        this.message = '';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

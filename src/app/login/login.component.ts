import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.authService.login(this.credentials).subscribe({
        next: () => {
          alert('Login successful!');
          this.router.navigate(['/dashboard']);   // ✅ only dashboard after login
        },
        error: () => {
          alert('Login failed! Please check username/password.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);   // ✅ navigate to register page
  }
}

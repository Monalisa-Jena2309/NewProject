import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', email: '', password: '' };
  isLoading = false;
  message = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted!', this.user); // DEBUG

    if (!this.user.username || !this.user.email || !this.user.password) {
      this.message = '❌ All fields are required!';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.authService.register(this.user).subscribe({
      next: res => {
        this.isLoading = false;
        this.message = '✅ Registered successfully!';
        this.user = { username: '', email: '', password: '' };
        form.resetForm(); // Reset the form
      },
      error: err => {
        this.isLoading = false;
        this.message = '❌ Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }
}

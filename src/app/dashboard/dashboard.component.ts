import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = '';
  role = '';
  userHello = '';
  adminHello = '';
  error = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';
  }

  testUserHello() {
    this.userHello = '';
    this.adminHello = '';
    this.error = '';
    this.auth.getUserHello().subscribe({
      next: (res) => this.userHello = res,
      error: (err) => this.error = `User Hello error: ${err.status}`
    });
  }

  testAdminHello() {
    this.userHello = '';
    this.adminHello = '';
    this.error = '';
    this.auth.getAdminHello().subscribe({
      next: (res) => this.adminHello = res,
      error: (err) => this.error = `Admin Hello error: ${err.status}`
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}

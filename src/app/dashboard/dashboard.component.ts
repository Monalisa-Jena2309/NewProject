import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  isBrowser: boolean;

  constructor(
    private router: Router,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.username = this.auth.getUsername();
      this.role = this.auth.getRole();
    }
  }

  testUserHello() {
    this.resetMessages();
    this.auth.getUserHello().subscribe({
      next: (res) => (this.userHello = res),
      error: (err) => (this.error = `❌ User Hello error: ${err.status}`)
    });
  }

  testAdminHello() {
    this.resetMessages();
    this.auth.getAdminHello().subscribe({
      next: (res) => (this.adminHello = res),
      error: (err) => (this.error = `❌ Admin Hello error: ${err.status}`)
    });
  }

  logout() {
    this.auth.logout(); // ✅ centralized clear
    this.router.navigate(['/login']);
  }

  private resetMessages() {
    this.userHello = '';
    this.adminHello = '';
    this.error = '';
  }
}

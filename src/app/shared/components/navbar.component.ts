import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav *ngIf="authService.currentUser()" style="background: #333; color: white; padding: 10px;">
      <span>Welcome, {{ authService.currentUser()?.username }}</span> |
      <a routerLink="/user-dashboard" style="color: white;">Profile</a> |
      <button (click)="authService.logout()">Logout</button>
    </nav>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);
}
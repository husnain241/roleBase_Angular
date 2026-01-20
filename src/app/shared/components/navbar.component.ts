import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav *ngIf="authService.currentUser()" class="navbar">
      <div class="navbar-container">
       <div class="navbar-brand">
  <span class="brand-icon">🚀</span>
  <span class="brand-text">
    {{ authService.currentUser()?.role === 'ADMIN' ? 'Admin Portal' : 'User Portal' }}
  </span>
</div>
        
        <div class="navbar-menu">
          <a routerLink="/user-dashboard" routerLinkActive="active" class="nav-link">
            <span class="nav-icon">👤</span>
            <span>Profile</span>
          </a>
          
          <div class="user-info">
            <span class="user-avatar">
{{ authService.currentUser()?.username?.charAt(0)?.toUpperCase() ?? '?' }}</span>
            <span class="user-name">{{ authService.currentUser()?.username }}</span>
          </div>
          
          <button (click)="authService.logout()" class="btn-logout">
            <span class="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
  /* White background with 70% transparency */
  background: rgba(227, 188, 241, 0.4); 
  
  /* Blurs the content behind the navbar (Glass effect) */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filte  r: blur(10px);
  
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-radius: 0 0 20px 20px;
}

    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0.75rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;

    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
    }

    .brand-icon {
      font-size: 1.5rem;
    }

    .brand-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      color: #d1d5db;
      text-decoration: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .nav-link.active {
      background: rgba(102, 126, 234, 0.2);
      color: #a5b4fc;
    }

    .nav-icon {
      font-size: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .user-name {
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .btn-logout {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(239, 68, 68, 0.1);
      color: #fca5a5;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.5);
      color: #fecaca;
      transform: translateY(-1px);
    }

    .logout-icon {
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .navbar-container {
        padding: 0.75rem 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .navbar-menu {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
      }

      .brand-text {
        display: none;
      }

      .user-name {
        display: none;
      }
    }
      .profile-card, .details-card, .security-card, .actions-card {
  /* Light white background with low opacity */
  background: rgba(255, 255, 255, 0.6);
  
  /* Adding blur for readability */
  backdrop-filter: blur(5px);
  
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07); /* Halka shadow */
}
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
}
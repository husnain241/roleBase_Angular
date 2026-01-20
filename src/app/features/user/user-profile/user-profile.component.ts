import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.currentUser();


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals for UI State
  currentUser = this.authService.currentUser;
  showEditModal = signal(false);
  showPasswordModal = signal(false);

  // Temporary forms
  editForm = { username: '', email: '' };
  passwordForm = { currentPassword: '', newPassword: '' };

  // --- EDIT PROFILE ---
  openEditModal() {
    const user = this.currentUser();
    if (user) {
      this.editForm = { username: user.username, email: user.email };
      this.showEditModal.set(true);
    }
  }

  saveProfile() {
    const user = this.currentUser();
    if (user) {
      const updatedUser = { ...user, ...this.editForm };
      this.authService.updateUser(updatedUser).subscribe(() => {
        this.authService.currentUser.set(updatedUser); // Update local state
        this.showEditModal.set(false);
        alert('Profile updated successfully!');
      });
    }
  }

  // --- PASSWORD CHANGE ---
  changePassword() {
    const user = this.currentUser();
    if (user) {
      this.authService.updateUserRole(user.id, user.role).subscribe(() => { 
        // In a real app, use a dedicated password endpoint. 
        // For JSON Server, we update the whole user object.
        const updatedUser = { ...user, password: this.passwordForm.newPassword };
        this.authService.updateUser(updatedUser).subscribe(() => {
          this.showPasswordModal.set(false);
          alert('Password changed successfully!');
        });
      });
    }
  }

  // --- DOWNLOAD DATA ---
  downloadData() {
    const data = JSON.stringify(this.currentUser(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile_data_${this.currentUser()?.username}.json`;
    link.click();
  }

  // --- DELETE ACCOUNT ---
  deleteAccount() {
    const user = this.currentUser();
    if (user && confirm('WARNING: This will permanently delete your account. Proceed?')) {
      this.authService.deleteUser(user.id).subscribe(() => {
        alert('Your account has been deleted.');
        this.authService.logout();
        this.router.navigate(['/login']);
      });
   
   
}
 
  }

logout() {
    // 1. Pehle data clear karein
    localStorage.removeItem('user');
    this.currentUser.set(null);

    // 2. Phir login page par bhejein
    this.router.navigate(['/login']); 
  }
}
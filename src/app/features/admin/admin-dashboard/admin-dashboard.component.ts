import { Component, OnInit, inject, signal,computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner.component';
import { Role } from '../../../core/models/role.enum';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent,FormsModule], // 2. ADD FormsModule TO THE IMPORTS ARRAY],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  
  // Signal to store the list of users
  users = signal<User[]>([]);
  isLoading = this.authService.isLoading;
  showCreateModal = signal<boolean>(false); // Controls the popup
// Computed signals: These update automatically when 'users' changes
  totalUsers = computed(() => this.users().length);
  adminCount = computed(() => this.users().filter(u => u.role === 'ADMIN').length);
  userCount = computed(() => this.users().filter(u => u.role === 'USER').length);

// 1. Create a signal for the search query
  searchQuery = signal<string>('');

  // 2. Create a computed signal for the filtered list
  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const allUsers = this.users();
    
    if (!query) return allUsers;

    return allUsers.filter(user => 
      user.username.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  });
  
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getUsers().subscribe(data => {
      this.users.set(data);
    });
  }

  removeUser(id: string) {
    if(confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe(() => {
        // Update the list locally after deleting from server
        this.users.update(prev => prev.filter(u => u.id !== id));
      });
    }
  }

// Model for the new user form
  newUser = {
    username: '',
    email: '',
    password: 'password123', // Default password
    role: Role.User
  };

  toggleModal() {
    this.showCreateModal.set(!this.showCreateModal());
  }

  onCreateUser() {
    const userToSave: User = {
      ...this.newUser,
      id: Math.random().toString(36).substring(2)
    };

    this.authService.register(userToSave).subscribe(() => {
      this.users.update(prev => [...prev, userToSave]); // Update table instantly
      this.toggleModal(); // Close modal
      this.newUser = { username: '', email: '', password: 'password123', role: Role.User }; // Reset
    });
  }

}
import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root' // This makes it a singleton available everywhere
})
export class AuthService {
  // We use a Signal to track the current user (Modern Angular way)
  // 1. A private array to act as our "Database"
  private usersDb: User[] = [];
  currentUser = signal<User | null>(null);

  constructor() {
  // Load existing user session from storage
    const savedUser = localStorage.getItem('user');
    if (savedUser) this.currentUser.set(JSON.parse(savedUser));
    
    // Load registered users list from storage (optional, for persistence)
    const savedDb = localStorage.getItem('users_db');
    if (savedDb) this.usersDb = JSON.parse(savedDb);
}

// 2. Register method: Saves a user to our list
  register(username: string, email: string, role: Role , password: string): void {
    const newUser: User = {
      id: Math.random().toString(36).substring(2),
      username,
      email,
      role,
      password
    };
    this.usersDb.push(newUser);
    localStorage.setItem('users_db', JSON.stringify(this.usersDb));
  }
  // 3. Login method: Now searches the list for the user
  login(email: string): boolean {
    const user = this.usersDb.find(u => u.email === email);
    
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false; // User not found
  }
  // ... rest of the service methods

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}
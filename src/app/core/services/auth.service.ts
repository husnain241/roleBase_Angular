import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { delay, finalize } from 'rxjs';
import { Role } from '../models/role.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // This makes it a singleton available everywhere
})
export class AuthService {
  // We use a Signal to track the current user (Modern Angular way)
  currentUser = signal<User | null>(null);
  isLoading = signal<boolean>(false);
  private router = inject(Router); // Router inject karein

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  constructor() {
  // Load existing user session from storage
    const savedUser = localStorage.getItem('user');
    if (savedUser) this.currentUser.set(JSON.parse(savedUser));
    
  
}


// REGISTER: Post new user to JSON Server
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // 3. Login method: Now searches the list for the user
// LOGIN: Search for user by email on the server
  login(email: string): Observable<boolean> {
    this.isLoading.set(true); // Start loading
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      delay(1000), // Optional: Artificial delay to actually see the spinner
      map(users => {
        this.isLoading.set(false); // Stop loading
        if (users.length > 0) {
          const user = users[0];
          this.currentUser.set(user);
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  // Add this method to your existing AuthService
getUsers(): Observable<User[]> {
  this.isLoading.set(true);
  return this.http.get<User[]>(this.apiUrl).pipe(
    finalize(() => this.isLoading.set(false))
  );
}

// Optional: Add a method to delete a user
deleteUser(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
}
updateUserRole(id: string, newRole: Role): Observable<User> {
  return this.http.patch<User>(`${this.apiUrl}/${id}`, { role: newRole });
}
  
  
  logout() {
    // 1. Pehle data clear karein
    localStorage.removeItem('user');
    this.currentUser.set(null);

    // 2. Phir login page par bhejein
    this.router.navigate(['/login']); 
  }
  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}
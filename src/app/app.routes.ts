import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.enum';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Public Routes
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) 
  },

  // Protected User Route
  { 
    path: 'user-dashboard', 
    canActivate: [authGuard, roleGuard], 
    data: { role: Role.User },
    loadComponent: () => import('./features/user/user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },

  // Protected Admin Route
  { 
    path: 'admin-dashboard', 
    canActivate: [authGuard, roleGuard], 
    data: { role: Role.Admin },
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  }
];
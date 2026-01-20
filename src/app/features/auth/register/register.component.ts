import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngFor
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Role } from '../../../core/models/role.enum';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // STEP 1: Make the Enum accessible to the HTML template
  public RoleEnum = Role; 

  // STEP 2: Create an array of keys to loop through in the dropdown
  roles = Object.values(Role); 

  regForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: [Role.User, Validators.required] // Set default to 'USER'
  });

  onRegister() {
  if (this.regForm.valid) {
    const userData = this.regForm.value as User;
    
    this.authService.register(userData).subscribe({
      next: () => {
        alert('Registration Successful in JSON Server!');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Registration failed', err)
    });
  }
}
}
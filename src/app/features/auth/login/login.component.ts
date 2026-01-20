import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role.enum';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,LoadingSpinnerComponent ], // <--- 2. ADD THIS HERE], // Import needed modules here
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  // Keep this private for security/encapsulation
  private authService = inject(AuthService); 
  private router = inject(Router);

  // Expose the signal directly to the template
  // The template will access it as: isLoading()
  isLoading = this.authService.isLoading; 

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;
      
      this.authService.login(email).subscribe(success => {
        if (success) {
          const user = this.authService.currentUser();
          const targetRoute = user?.role === Role.Admin ? '/admin-dashboard' : '/user-dashboard';
          this.router.navigate([targetRoute]);
        } else {
          alert('User not found in Database!');
        }
      });
    }
  }
}
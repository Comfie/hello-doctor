// login.component.ts
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible = false;
  loading = false;
  errorMessage = '';
  showResetPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get f() { return this.loginForm.controls; }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    // Mark all fields as touched to trigger validation messages
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';


    const credentials = {
      email: this.f.email.value,
      password: this.f.password.value,
      rememberMe: this.f.rememberMe.value
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.loading = false;
        this.errorMessage = '';

        // Navigate to the appropriate dashboard based on user role
        // const userRole = this.authService.getUserRole(); // Assuming you have a method to get the user's role
        // if (userRole === 'SystemAdministrator') {
        //   this.router.navigate(['/super-admin/dashboard']);
        // } else if (userRole === 'MainMember') {
        //   this.router.navigate(['/main-member/dashboard']);
        // } else {
        //   this.router.navigate(['/']);
        // }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });

    // // Simulate API call
    // setTimeout(() => {
    //   this.loading = false;
    //   this.router.navigate(['/super-admin/dashboard']);
    // }, 1500);
  }

  initiatePasswordReset() {
    this.showResetPassword = true;
    // In a real app, you would implement password reset logic here
  }
}
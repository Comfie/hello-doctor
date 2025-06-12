// login.component.ts
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
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

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/super-admin/dashboard']);
    }, 1500);
  }

  initiatePasswordReset() {
    this.showResetPassword = true;
    // In a real app, you would implement password reset logic here
  }
}
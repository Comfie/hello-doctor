import { CommonModule } from '@angular/common';
// registration.component.ts
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  currentStep = 1;
  totalSteps = 3;
  passwordVisible = false;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      // Step 1: Personal Information
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],

      // Step 2: Account Security
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],

      // Step 3: Terms and Verification
      acceptTerms: [false, [Validators.requiredTrue]],
      receiveUpdates: [true]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  get f() { return this.registrationForm.controls; }

  nextStep() {
    // Validate current step before proceeding
    if (this.currentStep === 1) {
      const step1Controls = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender'];
      step1Controls.forEach(control => {
        this.registrationForm.get(control)?.markAsTouched();
      });
      if (this.registrationForm.get('firstName')?.invalid || 
          this.registrationForm.get('lastName')?.invalid || 
          this.registrationForm.get('email')?.invalid || 
          this.registrationForm.get('phone')?.invalid || 
          this.registrationForm.get('dateOfBirth')?.invalid || 
          this.registrationForm.get('gender')?.invalid) {
        return;
      }
    } else if (this.currentStep === 2) {
      this.registrationForm.get('password')?.markAsTouched();
      this.registrationForm.get('confirmPassword')?.markAsTouched();
      if (this.registrationForm.get('password')?.invalid || 
          this.registrationForm.get('confirmPassword')?.invalid) {
        return;
      }
    }
    
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    // Mark all fields as touched to trigger validation messages
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/registration-success']);
    }, 2000);
  }

  getPasswordStrength() {
    const password = this.registrationForm.get('password')?.value;
    if (!password) return 0;
    
    let strength = 0;
    // Length >= 8
    if (password.length >= 8) strength++;
    // Contains lowercase
    if (/[a-z]/.test(password)) strength++;
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++;
    // Contains number
    if (/\d/.test(password)) strength++;
    // Contains special char
    if (/[@$!%*?&]/.test(password)) strength++;
    
    return (strength / 5) * 100;
  }

  getPasswordStrengthColor() {
    const strength = this.getPasswordStrength();
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  getPasswordStrengthText() {
    const strength = this.getPasswordStrength();
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Moderate';
    return 'Strong';
  }

  getStepName() {
    switch (this.currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Account Security';
      case 3: return 'Terms and Verification';
      default: return '';
    }
  }
}
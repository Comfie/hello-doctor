import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProfileHelperService } from '../../../../core/services/profile-helper.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private profileHelperService: ProfileHelperService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      currentPassword: [''],
      confirmPassword: ['', [Validators.required]],
      newPassword: [''],
    });

    // Load current user data

    // this.loadUserData();
  }

  // loadUserData(): void {

  //   // Call service to get current user data and patch the form

  //   const currentUser = { name: 'Admin User', email: 'admin@example.com', phone: '1234567890' };

  //   this.profileForm.patchValue(currentUser);

  // }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // Call service to update profile

      console.log(this.profileForm.value);

      // Handle password change if provided
    }
  }
}

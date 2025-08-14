import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editMode = false;
  profileImage: string | SafeUrl = 'assets/images/default-avatar.png'; // Default image
  originalFormData: any;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      currentPassword: [''],
      newPassword: ['', [Validators.minLength(8)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword || confirmPassword) {
      return newPassword === confirmPassword ? null : { passwordMismatch: true };
    }
    return null;
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser(); // Assuming this method returns the current user's data
    if (!currentUser) {
      this.toastService.show('info', 'Information', 'User data not found.');
      return;
    }

    this.profileForm.patchValue({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: currentUser.phoneNumber
    });

    this.profileImage = 'assets/images/default-avatar.png'; // Fallback to default image if none provided
    this.originalFormData = { ...this.profileForm.value };
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;

    if (this.editMode) {
      // Save original state when entering edit mode
      this.originalFormData = { ...this.profileForm.value };
    } else {
      // Reset form when canceling edit mode
      this.cancelEdit();
    }
  }


  cancelEdit(): void {
    this.editMode = false;
    this.profileForm.patchValue(this.originalFormData);

    // Clear password fields
    this.profileForm.patchValue({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.match('image.*')) {
        alert('Please select a valid image file (JPEG, PNG, etc.)');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      // Create a preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(file);

      // In a real app, you would upload the file to a server here
      // this.uploadProfileImage(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

      // Handle password change only if new password is provided
      if (formData.newPassword) {
        // Verify current password first (in a real app)
        console.log('Changing password...');
      }

      // In a real app, submit to API
      console.log('Profile updated:', formData);

      // Exit edit mode after save
      this.editMode = false;
      this.originalFormData = { ...this.profileForm.value };

      // Clear password fields
      this.profileForm.patchValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }
}

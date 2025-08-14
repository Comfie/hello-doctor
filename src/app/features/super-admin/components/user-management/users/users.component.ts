import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { last } from 'rxjs';
import { CreateUserCommand, SystemAdminService } from '../../../../../../generated/api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../../../generated/api';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  editingUserId: string | null = null;
  editUserForm: { firstName: string; lastName: string; email: string; phoneNumber: string } | null = null;
  newUser: CreateUserCommand = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
  };
  showUserModal = false;

  constructor(
    private systemAdminService: SystemAdminService,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.startEdit(id);
      } else {
        this.cancelEdit();
      }
    });
  }

  loadUsers() {
    this.systemAdminService
      .apiV1SystemAdminGetAllUsersGet()
      .pipe(last())
      .subscribe({
        next: (response: any) => {
          this.users = response;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.toastService.show(
            'error',
            'User Load Failed',
            'There was an error loading the users. Please try again.'
          );
        },
      });
  }

  startEdit(id: string) {
    this.editingUserId = id;
    this.authService.apiV1AuthenticationGetUserByIdIdGet(id).pipe(last()).subscribe({
      next: (res: any) => {
        const u = res?.value || res;
        this.editUserForm = {
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          email: u.email || '',
          phoneNumber: u.phoneNumber || ''
        };
      },
      error: (err) => {
        this.toastService.show('error', 'Load Failed', 'Could not load user details.');
      }
    });
  }

  saveEdit() {
    if (!this.editingUserId || !this.editUserForm) return;
    const payload = {
      id: this.editingUserId,
      request: {
        firstName: this.editUserForm.firstName,
        lastName: this.editUserForm.lastName,
        email: this.editUserForm.email,
        phoneNumber: this.editUserForm.phoneNumber,
      }
    };
    this.authService.apiV1AuthenticationUpdateUserPut(payload as any).pipe(last()).subscribe({
      next: () => {
        this.toastService.show('success', 'User Updated', 'User information updated successfully.');
        this.loadUsers();
        this.cancelEdit(true);
      },
      error: () => this.toastService.show('error', 'Update Failed', 'Could not update user.'),
    });
  }

  cancelEdit(navigateBack: boolean = false) {
    this.editingUserId = null;
    this.editUserForm = null;
    if (navigateBack) {
      this.router.navigate(['/super-admin/users']);
    } else {
      // Ensure URL is reset so the same Edit link can be clicked again
      if (this.route.snapshot.paramMap.get('id')) {
        this.router.navigate(['/super-admin/users']);
      }
    }
  }

  openCreateUserModal(): void {
    this.showUserModal = true;
  }

  closeRoleModal(): void {
    this.showUserModal = false;
  }

  createUser() {
    if (!this.newUser.firstname || !this.newUser.lastname || !this.newUser.email || !this.newUser.role) {
      this.toastService.show(
        'error',
        'Validation Error',
        'Please fill in all required fields.'
      );
      return;
    }
    this.authService
      .apiV1AuthenticationCreatePost(this.newUser)
      .pipe(last())
      .subscribe({
        next: (response: any) => {
          console.log('User created successfully:', response);
          this.loadUsers();
          this.newUser = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: '',
            phoneNumber: '',
          }; // Reset the form
          this.toastService.show(
            'success',
            'User Created',
            `User ${response.firstname} ${response.lastname} created successfully.`
          );
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.toastService.show(
            'error',
            'User Creation Failed',
            'There was an error creating the user. Please try again.'
          );
        },
      });
  }
}

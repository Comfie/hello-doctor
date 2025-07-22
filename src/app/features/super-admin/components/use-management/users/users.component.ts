import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();
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

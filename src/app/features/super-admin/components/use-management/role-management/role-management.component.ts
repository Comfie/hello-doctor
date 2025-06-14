import { ChangeRoleStatusCommand } from './../../../../../../generated/api/model/changeRoleStatusCommand';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SystemAdminService,
  UpdateUserRoleCommand,
} from '../../../../../../generated/api';

@Component({
  selector: 'app-role-management',
  imports: [NgIf, NgFor, ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})
export class RoleManagementComponent implements OnInit {
  activeTab = 'roles';
  roles: any[] = [];
  users: any[] = [];
  userRoles: string[] = [];
  activeRoles: any[] = [];
  selectedUserId: string | null = null;
  roleToAssign: string | null = null;

  showRoleModal = false;
  roleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roleService: SystemAdminService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRoles();
    this.loadUsers();
  }

  initializeForm(): void {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      description: [''],
    });
  }

  loadRoles(): void {
    this.roleService.apiV1SystemAdminGetRolesGet().subscribe({
      next: (roles: any) => {
        this.roles = roles;
        console.log(this.roles);
        this.activeRoles = roles.filter(
          (role: any) => role.isDeleted === false
        );
      },
      error: (err) => {
        console.error('Failed to load roles', err);
      },
    });
  }

  loadUsers(): void {
    this.roleService.apiV1SystemAdminGetAllUsersGet().subscribe({
      next: (result: any) => (this.users = result! || []),
      error: (err) => {
        console.error('Failed to load users', err);
      },
    });
  }

  loadUserRoles(): void {
    if (!this.selectedUserId) return;

    this.roleService
      .apiV1SystemAdminGetUserRolesIdGet(this.selectedUserId)
      .subscribe({
        next: (roles: any) => (this.userRoles = roles),
        error: (err) => {
          console.error('Failed to load user roles', err);
        },
      });
  }

  openCreateRoleModal(): void {
    this.roleForm.reset();
    this.showRoleModal = true;
  }

  closeRoleModal(): void {
    this.showRoleModal = false;
  }

  saveRole(): void {
    if (this.roleForm.invalid) return;

    this.roleService
      .apiV1SystemAdminCreateRolePost(this.roleForm.value)
      .subscribe({
        next: () => {
          this.loadRoles();
          this.closeRoleModal();
        },
        error: (err) => {
          console.error('Failed to create role', err);
        },
      });
  }

  toggleRoleStatus(role: any): void {
    const newStatus = !(role.status === true);

    const command: ChangeRoleStatusCommand = {
      role: role.name,
      status: newStatus,
    };

    this.roleService.apiV1SystemAdminUpdateRoleStatusPut(command).subscribe({
      next: () => {
        role.status = newStatus;
        this.activeRoles = this.roles.filter((r) => r.status === 'Active');
      },
      error: (err) => {
        console.error('Failed to update role status', err);
      },
    });
  }

  deleteRole(role: any): void {
    if (
      confirm(
        `Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`
      )
    ) {
      this.roleService.apiV1SystemAdminRevokeRolePut(role.id).subscribe({
        next: () => {
          this.loadRoles();
        },
        error: (err) => {
          console.error('Failed to delete role', err);
        },
      });
    }
  }

  assignRole(): void {
    if (!this.selectedUserId || !this.roleToAssign) return;

    const command: UpdateUserRoleCommand = {
      userId: this.selectedUserId,
      role: this.roleToAssign,
    };

    this.roleService.apiV1SystemAdminUpdateUserRolePut(command).subscribe({
      next: () => {
        this.loadUserRoles();
        this.roleToAssign = null;
      },
      error: (err) => {
        console.error('Failed to assign role', err);
      },
    });
  }

  removeRole(roleName: string): void {
    if (!this.selectedUserId) return;

    const command = {
      userId: this.selectedUserId,
      roleName: roleName,
    };

    this.roleService.apiV1SystemAdminRevokeRolePut(command).subscribe({
      next: () => {
        this.loadUserRoles();
      },
      error: (err) => {
        console.error('Failed to revoke role', err);
      },
    });
  }
}

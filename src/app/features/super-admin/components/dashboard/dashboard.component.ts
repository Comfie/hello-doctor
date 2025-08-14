import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SystemAdminService, PharmacyService, UserDetailsResponseListResult } from '../../../../../generated/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;
  activePharmacies = 0;

  // Quick actions for super admin
  quickActions = [
    {
      name: 'Add User',
      link: '/super-admin/users/new',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
    },
    {
      name: 'Audit Logs',
      link: '/super-admin/audit-logs',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      name: 'System Settings',
      link: '/super-admin/settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    },
    {
      name: 'Generate Report',
      link: '/super-admin/reports',
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    }
  ];

  constructor(
    private systemAdminService: SystemAdminService,
    private pharmacyService: PharmacyService
  ) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  private loadCounts() {
    this.systemAdminService.apiV1SystemAdminGetAllUsersGet().subscribe({
      next: (res: any) => {
        this.totalUsers = (res || []).length
      },
      error: () => this.totalUsers = 0,
    });
    this.pharmacyService.apiV1PharmacyGetActivePharmaciesGet().subscribe({
      next: (res) => this.activePharmacies = (res?.value || []).length,
      error: () => this.activePharmacies = 0,
    });
  }

  /**
   * Handle quick action clicks
   * @param action The selected quick action
   */
  handleQuickAction(action: any): void {
    console.log('Quick action selected:', action.name);
  }
}

/*
  // Quick actions for super admin
  quickActions = [
    {
      name: 'Add User',
      link: '/super-admin/users/new',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
    },
    {
      name: 'Audit Logs',
      link: '/super-admin/audit-logs',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      name: 'System Settings',
      link: '/super-admin/settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    },
    {
      name: 'Generate Report',
      link: '/super-admin/reports',
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    }
  ];
*/





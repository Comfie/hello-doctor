import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NgClass, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Statistics cards data
  stats = [
    { 
      name: 'Total Users', 
      value: 1245, 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
    },
    { 
      name: 'Active Pharmacies', 
      value: 86, 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' 
    },
    { 
      name: 'Pending Issues', 
      value: 12, 
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    { 
      name: 'System Health', 
      value: '98%', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z' 
    }
  ];

  // Recent system activities
  recentActivities = [
    {
      id: 1,
      action: 'Created new pharmacy account',
      user: 'MedLife Pharmacy',
      date: '2 hours ago',
      status: 'Completed'
    },
    {
      id: 2,
      action: 'Updated system security settings',
      user: 'System Admin',
      date: '4 hours ago',
      status: 'Completed'
    },
    {
      id: 3,
      action: 'Resolved database connection issue',
      user: 'Tech Support',
      date: 'Yesterday',
      status: 'Completed'
    },
    {
      id: 4,
      action: 'User role permissions update',
      user: 'Healthcare Pharmacy',
      date: 'Jan 12, 2023',
      status: 'Pending'
    },
    {
      id: 5,
      action: 'System backup initiated',
      user: 'Automated Process',
      date: 'Jan 10, 2023',
      status: 'Processing'
    }
  ];

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

  // System services status
  systemServices = [
    { name: 'API Service', status: 'Operational' },
    { name: 'Database', status: 'Operational' },
    { name: 'Authentication', status: 'Operational' },
    { name: 'Notification Service', status: 'Degraded' },
    { name: 'Payment Gateway', status: 'Operational' },
    { name: 'Prescription Processing', status: 'Operational' }
  ];

  constructor() { }

  ngOnInit(): void {
    // In a real application, you would fetch data from services here
    this.fetchDashboardData();
  }

  /**
   * Simulate fetching data from backend services
   */
  fetchDashboardData(): void {
    // This would be replaced with actual API calls
    console.log('Fetching super admin dashboard data...');
    
    // Mock API request simulation
    setTimeout(() => {
      // Update stats with fresh data
      this.stats = [
        { ...this.stats[0], value: 1287 },
        { ...this.stats[1], value: 92 },
        { ...this.stats[2], value: 8 },
        { ...this.stats[3], value: '99%' }
      ];
      
      // Update system services status
      this.systemServices[3].status = 'Operational';
      
      console.log('Dashboard data updated');
    }, 1500);
  }

  /**
   * Handle quick action clicks
   * @param action The selected quick action
   */
  handleQuickAction(action: any): void {
    console.log('Quick action selected:', action.name);
    // In a real application, you might track analytics here
    // or perform specific operations before navigation
  }
}

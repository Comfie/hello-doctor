import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  showUserMenu = false;

  stats = [
    {
      name: 'Active Prescriptions',
      value: 3,
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
      name: 'Family Members',
      value: 4,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      name: 'Upcoming Refills',
      value: 2,
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
      name: 'Doctor Visits',
      value: 1,
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z',
    },
  ];

  recentPrescriptions = [
    {
      id: 'RX-4892',
      medication: 'Lisinopril 10mg',
      doctor: 'Dr. Smith',
      date: '2 days ago',
      status: 'Filled',
    },
    {
      id: 'RX-4891',
      medication: 'Atorvastatin 20mg',
      doctor: 'Dr. Johnson',
      date: '1 week ago',
      status: 'Pending',
    },
    {
      id: 'RX-4889',
      medication: 'Metformin 500mg',
      doctor: 'Dr. Williams',
      date: '2 weeks ago',
      status: 'Filled',
    },
  ];

  quickActions = [
    {
      name: 'Upload Prescription',
      icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
      link: '/prescriptions/upload',
    },
    {
      name: 'Request Refill',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      link: '/prescriptions/refill',
    },
    {
      name: 'Message Doctor',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      link: '/messages/new',
    },
    {
      name: 'Add Family Member',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      link: '/family/add',
    },
  ];

  familyMembers = [
    {
      name: 'Sarah Johnson',
      relationship: 'Wife',
      avatar: 'assets/avatars/female-1.jpg',
    },
    {
      name: 'Michael Johnson Jr.',
      relationship: 'Son',
      avatar: 'assets/avatars/child-1.jpg',
    },
    {
      name: 'Emily Johnson',
      relationship: 'Daughter',
      avatar: 'assets/avatars/child-2.jpg',
    },
  ];

  constructor(public authService: AuthService) {}

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
  }
}

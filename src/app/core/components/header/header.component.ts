import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isAuthenticated = false;
  userRole: 'SuperAdministrator' | 'PharmacyAdministrator' | 'MainMember' | 'Pharmacist' | 'Doctor' | null = null;
  @Input() userName = '';
  @Input() userAvatar = '';
  
  showMobileMenu = false;
  showUserDropdown = false;
  isSidebarCollapsed = false;

  // Quick actions based on role
  roleActions: { [key: string]: any[] } = {
    'SuperAdministrator': [
      { label: 'System Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', route: './dashboard' },
      { label: 'User Management', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', route: './users' }
    ],
    'PharmacyAdministrator': [
      { label: 'Prescription Queue', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', route: '/prescriptions' },
      { label: 'Create Invoice', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', route: '/billing/new' }
    ],
    'MainMember': [
      { label: 'Upload Prescription', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12', route: '/prescriptions/upload' },
      { label: 'My Family', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', route: '/family' }
    ],
    'Pharmacist': [
      { label: 'Dispense Medications', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', route: '/dispense' }
    ],
    'Doctor': [
      { label: 'Create Prescription', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', route: '/prescriptions/new' }
    ]
  };

  constructor(private router: Router, private authService: AuthService) {
    this.userRole = this.authService.getUserRole() as 'SuperAdministrator' | 'PharmacyAdministrator' | 'MainMember' | 'Pharmacist' | 'Doctor' | null;
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnInit() {
    // Initialize user details if available
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.firstName || 'User';
      this.userAvatar = 'default-avatar.png'; // Replace with actual default avatar path
    }
  }

  get userActions() {
    return this.userRole ? this.roleActions[this.userRole] : [];
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.showMobileMenu = false;
  }

  logout() {
    // Implement your logout logic here
    this.router.navigate(['/login']);
    this.showUserDropdown = false;
    this.showMobileMenu = false;
  }
}
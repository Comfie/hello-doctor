import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-public',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.css']
})
export class HeaderPublicComponent {
  
  showMobileMenu = false;
  showUserDropdown = false;
  
  // Navigation items for unauthenticated users
  publicNavItems = [
    { label: 'Home', route: '/' },
    { label: 'Features', route: '/features' },
    { label: 'How It Works', route: '/how-it-works' },
    { label: 'For Pharmacies', route: '/pharmacies' },
    { label: 'For Doctors', route: '/doctors' },
    { label: 'Pricing', route: '/pricing' },
  ];


  constructor(private router: Router) {}


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
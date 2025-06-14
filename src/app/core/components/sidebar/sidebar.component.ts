import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  roles?: string[];
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [NgIf, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  currentRole = ''; // Ideally fetched from auth service
  navItems: NavItem[] = [];
  userName = 'Comfort';
  userAvatar = 'Nyatsine Comfort';
  isExpanded = true;
  activeSubmenu: string | null = null;


  constructor(private navService: NavigationService, 
    private authService: AuthService) {
      this.currentRole = this.authService.getUserRole() as string;
    }

  ngOnInit(): void {
    this.navItems = this.navService.getNavItems(this.currentRole);
  }

  toggleSubmenu(label: string): void {
    this.activeSubmenu = this.activeSubmenu === label ? null : label;
  }

  get filteredNavItems(): NavItem[] {
    return this.navItems.filter(
      (item) =>
        item.roles!.includes(this.currentRole) || item.roles!.includes('*')
    );
  }

}

import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

currentTab = 'general';

  tabs = [
    { id: 'general', name: 'General' },
    { id: 'security', name: 'Security' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'integrations', name: 'Integrations' }
  ];

  timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Dubai',
    'Asia/Tokyo'
  ];

  settings = {
    systemName: 'Hello Doctor System',
    timezone: 'UTC',
    maintenanceMode: false,
    require2FA: true,
    passwordPolicy: 'high',
    sessionTimeout: '30',
    notifications: {
      systemAlerts: true,
      securityEvents: true,
      userActivities: false
    }
  };

  selectedTheme: 'light'|'dark'|'system' = 'light';

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    // In real app, load settings from service
    this.loadSettings();
    // initialize selectedTheme from saved mode
    const saved = this.theme.getSavedMode();
    this.selectedTheme = saved as any;
  }

  onThemeSelect(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    const value = (select?.value ?? 'light') as 'light'|'dark'|'system';
    this.selectedTheme = value;
    this.theme.setTheme(value);
  }


  loadSettings(): void {
    // Replace with actual API call
    console.log('Loading system settings...');
    // this.settingsService.getSettings().subscribe(settings => this.settings = settings);
  }

  saveSettings(): void {
    console.log('Saving settings:', this.settings);
    // this.settingsService.updateSettings(this.settings).subscribe(() => {
    //   this.showSuccess('Settings saved successfully');
    // });
  }

}

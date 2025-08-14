import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { NgClass, NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainMemberService, BeneficiaryService, MyPrescriptionItem, BeneficiaryResponse } from '../../../../../generated/api';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, NgClass, RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  showUserMenu = false;
  loading = true;
  error: string | null = null;

  stats = [
    {
      name: 'Active Prescriptions',
      value: 0,
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
      name: 'Family Members',
      value: 0,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      name: 'Upcoming Refills',
      value: 0,
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
      name: 'Doctor Visits',
      value: 0,
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z',
    },
  ];

  recentPrescriptions: Array<MyPrescriptionItem> = [];

  quickActions = [
    {
      name: 'Upload Prescription',
      icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
      link: '/main-member/prescriptions/upload',
    },
    {
      name: 'Request Refill',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      link: '/main-member/prescriptions',
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

  familyMembers: Array<{ name: string; relationship: string | null; avatar: string }> = [];

  constructor(
    public authService: AuthService,
    private mainMemberService: MainMemberService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit(): void {
    this.loadCounts();
    this.loadRecentPrescriptions();
    this.loadFamilyMembers();
  }

  private loadCounts() {
    this.mainMemberService.apiV1MainMemberMeReportsCountsGet().subscribe({
      next: (res) => {
        const counts = res?.value || {} as any;
        this.setStat('Active Prescriptions', counts['ActivePrescriptions'] ?? counts['activePrescriptions'] ?? 0);
        this.setStat('Family Members', counts['FamilyMembers'] ?? counts['familyMembers'] ?? 0);
        this.setStat('Upcoming Refills', counts['UpcomingRefills'] ?? counts['upcomingRefills'] ?? 0);
        this.setStat('Doctor Visits', counts['DoctorVisits'] ?? counts['doctorVisits'] ?? 0);
      },
      error: () => {
        this.error = 'Failed to load counts';
      }
    });
  }

  private setStat(name: string, value: number) {
    const idx = this.stats.findIndex(s => s.name === name);
    if (idx > -1) this.stats[idx] = { ...this.stats[idx], value };
  }

  private loadRecentPrescriptions() {
    this.mainMemberService.apiV1MainMemberMePrescriptionsGet().subscribe({
      next: (res) => {
        this.recentPrescriptions = res?.value || [];
      },
      error: () => {
        this.error = 'Failed to load prescriptions';
      }
    });
  }

  private loadFamilyMembers() {
    const userId = this.authService.getUserId();
    if (!userId) return;
    this.beneficiaryService.apiV1BeneficiaryGetAllMemberBeneficiariesIdGet(userId).subscribe({
      next: (res) => {
        const list: Array<BeneficiaryResponse> = res?.value || [];
        this.familyMembers = list.map(b => ({
          name: `${b.firstName ?? ''} ${b.lastName ?? ''}`.trim(),
          relationship: b.relationshipToMainMember ?? null,
          avatar: 'assets/avatars/default.png',
        }));
      },
      error: () => {
        this.error = 'Failed to load family members';
      }
    });
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
  }
}

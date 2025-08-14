import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PharmacyService } from '../../../../../../generated/api';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-pharmacies-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, RouterLink],
  templateUrl: './pharmacies-list.component.html',
  styleUrls: ['./pharmacies-list.component.css'],
})
export class PharmaciesListComponent implements OnInit {
  pharmacies: any[] = [];
  q = '';
  loading = false;

  constructor(private pharmacyService: PharmacyService, private toast: ToastService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.pharmacyService.apiV1PharmacyGetAllPharmaciesGet().subscribe({
      next: (res: any) => {
        this.pharmacies = res?.value ?? res ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.show('error', 'Load Failed', 'Could not load pharmacies');
      },
    });
  }

  get filtered() {
    const query = this.q.trim().toLowerCase();
    return this.pharmacies.filter((p) =>
      [p.name, p.contactEmail, p.contactPerson, p.address]
        .filter(Boolean)
        .some((v: string) => (v || '').toLowerCase().includes(query))
    );
  }

  toggleActive(p: any) {
    // No dedicated enable/disable endpoint in client; show info for now
    const action = p.isActive ? 'Disable' : 'Enable';
    this.toast.show('info', `${action} not implemented`, 'Endpoint not available in client yet.');
  }
}



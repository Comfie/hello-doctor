import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PharmacyService } from '../../../../../../generated/api';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-pharmacy-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css'],
})
export class PharmacyDetailsComponent implements OnInit {
  id!: number;
  model: any = { name: '', address: '', contactPerson: '', contactEmail: '', contactNumber: '', isActive: true };
  loading = false;
  saving = false;
  deleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pharmacyService: PharmacyService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load() {
    this.loading = true;
    this.pharmacyService.apiV1PharmacyGetPharmacyIdGet(this.id).subscribe({
      next: (res: any) => {
        const p = res?.value ?? res;
        this.model = {
          name: p.name || '',
          address: p.address || '',
          contactPerson: p.contactPerson || '',
          contactEmail: p.contactEmail || '',
          contactNumber: p.contactNumber || '',
          isActive: !!p.isActive,
        };
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.show('error', 'Load Failed', 'Could not load pharmacy');
      },
    });
  }

  back() { this.router.navigate(['/super-admin/pharmacies']); }

  save() {
    // TODO: Wire to update pharmacy endpoint when available
    this.toast.show('info', 'Not Implemented', 'Update endpoint not available in client yet.');
  }

  disable() {
    // TODO: Wire to disable/enable endpoint if different from delete
    this.toast.show('info', 'Not Implemented', 'Disable/Enable endpoint not available in client yet.');
  }

  delete() {
    if (!confirm('Are you sure you want to delete this pharmacy?')) return;
    this.deleting = true;
    this.pharmacyService.apiV1PharmacyDeletePharmacyIdPut(this.id).subscribe({
      next: () => {
        this.toast.show('success', 'Deleted', 'Pharmacy deleted');
        this.router.navigate(['/super-admin/pharmacies']);
      },
      error: () => {
        this.deleting = false;
        this.toast.show('error', 'Failed', 'Could not delete pharmacy');
      },
      complete: () => (this.deleting = false),
    });
  }
}


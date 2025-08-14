import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreatePharmacyRequest, PharmacyService } from '../../../../../../generated/api';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-pharmacy-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pharmacy-create.component.html',
  styleUrls: ['./pharmacy-create.component.css'],
})
export class PharmacyCreateComponent {
  model: CreatePharmacyRequest = { name: '', address: '', contactPerson: '', contactEmail: '', contactNumber: '' } as any;
  saving = false;

  constructor(private pharmacyService: PharmacyService, private router: Router, private toast: ToastService) {}

  create() {
    this.saving = true;
    this.pharmacyService.apiV1PharmacyCreatePost(this.model).subscribe({
      next: (res: any) => {
        const created = res?.value ?? res;
        this.toast.show('success', 'Created', 'Pharmacy created successfully');
        this.router.navigate(['/super-admin/pharmacies']);
      },
      error: () => {
        this.saving = false;
        this.toast.show('error', 'Failed', 'Could not create pharmacy');
      },
      complete: () => (this.saving = false),
    });
  }
}


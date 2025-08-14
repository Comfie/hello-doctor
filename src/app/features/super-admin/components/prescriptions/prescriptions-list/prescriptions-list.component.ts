import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PharmacyService, PrescriptionService } from '../../../../../../generated/api';
import { ToastService } from '../../../../../core/services/toast.service';


@Component({
  selector: 'app-prescriptions-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './prescriptions-list.component.html',
  styleUrls: ['./prescriptions-list.component.css'],
})
export class PrescriptionsListComponent implements OnInit {
  pharmacies: any[] = [];
  prescriptions: any[] = [];
  loading = false;

  // Filters
  selectedPharmacyId: number | 'ALL' = 'ALL';
  memberQuery = '';

  // Sorting
  sortField: 'pharmacy' | 'member' | 'date' | 'status' = 'date';
  sortDir: 'asc' | 'desc' = 'desc';

  constructor(
    private pharmacyService: PharmacyService,
    private prescriptionService: PrescriptionService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPharmacies();
  }

  loadPharmacies(): void {
    this.pharmacyService.apiV1PharmacyGetAllPharmaciesGet().subscribe({
      next: (res: any) => {
        this.pharmacies = res?.value ?? res ?? [];
        this.fetchPrescriptions();
      },
      error: () => {
        this.toast.show('error', 'Load Failed', 'Could not load pharmacies');
      },
    });
  }

  fetchPrescriptions(): void {
    this.loading = true;
    const loadForPharmacy = (pid: number) =>
      this.preservationWrapper(
        this.prescriptionService.apiV1PrescriptionPharmacyPharmacyIdGet(pid).pipe(
          map((r: any) => r?.value ?? r ?? [])
        )
      );

    if (this.selectedPharmacyId === 'ALL') {
      if (!this.pharmacies.length) {
        this.loading = false;
        this.prescriptions = [];
        return;
      }
      const calls = this.pharmacies.map((p: any) => loadForPharmacy(p.id));
      forkJoin(calls).subscribe({
        next: (lists) => {
          this.prescriptions = lists.flat();
          this.applySort();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.toast.show('error', 'Load Failed', 'Could not load prescriptions');
        },
      });
    } else {
      loadForPharmacy(this.selectedPharmacyId as number).subscribe({
        next: (list: any[]) => {
          this.prescriptions = list;
          this.applySort();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.toast.show('error', 'Load Failed', 'Could not load prescriptions');
        },
      });
    }
  }

  private preservationWrapper<T>(obs: any) {
    // Helper to avoid whole forkJoin failing due to one pharmacy error
    return obs.pipe(catchError(() => of([])));
  }

  get filtered(): any[] {
    const q = this.memberQuery.trim().toLowerCase();
    let list = this.prescriptions;
    if (q) {
      list = list.filter((p) => (p.memberEmail || '').toLowerCase().includes(q));
    }
    return list;
  }

  changeSort(field: 'pharmacy' | 'member' | 'date' | 'status') {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDir = 'asc';
    }
    this.applySort();
  }

  getPharmacyName = (id: number | null | undefined) =>
    this.pharmacies.find((p) => p.id === id)?.name || '';

  private applySort() {
    const dir = this.sortDir === 'asc' ? 1 : -1;

    this.prescriptions.sort((a, b) => {
      let av: any = '';
      let bv: any = '';
      switch (this.sortField) {
        case 'pharmacy':
          av = this.getPharmacyName(a.assignedPharmacyId);
          bv = this.getPharmacyName(b.assignedPharmacyId);
          break;
        case 'member':
          av = (a.memberEmail || '').toLowerCase();
          bv = (b.memberEmail || '').toLowerCase();
          break;
        case 'status':
          av = (a.status || '').toLowerCase();
          bv = (b.status || '').toLowerCase();
          break;
        case 'date':
        default:
          av = a.issuedDate ? new Date(a.issuedDate).getTime() : 0;
          bv = b.issuedDate ? new Date(b.issuedDate).getTime() : 0;
          break;
      }
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }

  goToDetails(p: any) {
    this.router.navigate(['/super-admin/prescriptions', p.id]);
  }

  download(p: any) {
    if (!p?.fileIds?.length) {
      this.toast.show('info', 'No Files', 'This prescription has no files to download');
      return;
    }
    const fileId = p.fileIds[0];
    this.prescriptionService.apiV1PrescriptionIdDownloadFileIdGet(p.id, fileId, 'response' as any)
      .subscribe({
        next: (resp: any) => {
          const blob = resp.body as Blob;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `prescription-${p.id}-${fileId}.bin`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        },
        error: () => this.toast.show('error', 'Download Failed', 'Could not download file')
      });
  }
}


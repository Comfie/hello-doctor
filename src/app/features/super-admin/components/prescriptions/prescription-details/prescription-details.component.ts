import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrescriptionService, PharmacyService } from '../../../../../../generated/api';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-prescription-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prescription-details.component.html',
  styleUrls: ['./prescription-details.component.css'],
})
export class PrescriptionDetailsComponent implements OnInit {
  id!: number;
  data: any;
  pharmacyName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prescriptionService: PrescriptionService,
    private pharmacyService: PharmacyService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load(): void {
    this.prescriptionService.apiV1PrescriptionIdGet(this.id).subscribe({
      next: (res: any) => {
        this.data = res?.value ?? res;
        if (this.data?.assignedPharmacyId) {
          this.pharmacyService.apiV1PharmacyGetPharmacyIdGet(this.data.assignedPharmacyId).subscribe({
            next: (p: any) => (this.pharmacyName = (p?.value ?? p)?.name || null),
            error: () => (this.pharmacyName = null),
          });
        }
      },
      error: () => {
        this.toast.show('error', 'Load Failed', 'Could not load prescription details');
      }
    });
  }

  back() {
    this.router.navigate(['/super-admin/prescriptions']);
  }

  download(p: { id: number; fileIds: number[] }) {
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


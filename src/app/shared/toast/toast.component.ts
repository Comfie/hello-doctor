import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [
        NgClass,
        AsyncPipe,
        NgForOf,
        NgIf
    ],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
    constructor(public toastService: ToastService) {}
}
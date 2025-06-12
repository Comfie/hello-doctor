import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;  // Added title field
  message: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private idCounter = 0;

 public show(type: ToastMessage['type'], title: string, message: string) {
  const newToast: ToastMessage = {
    type,
    title,       // Include title
    message,
    id: this.idCounter++,
  };

  const currentToasts = this.toastsSubject.value;
  this.toastsSubject.next([...currentToasts, newToast]);

  setTimeout(() => this.remove(newToast.id), 3000);
}

  remove(id: number) {
    const filtered = this.toastsSubject.value.filter(t => t.id !== id);
    this.toastsSubject.next(filtered);
  }
}
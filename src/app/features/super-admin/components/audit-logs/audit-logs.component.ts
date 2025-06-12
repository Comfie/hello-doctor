import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audit-logs',
  imports: [NgFor, FormsModule, NgClass],
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css']
})
export class AuditLogsComponent implements OnInit {

eventTypes = [
    'Login',
    'Logout',
    'User Created',
    'User Modified',
    'Permission Changed',
    'System Setting Changed',
    'Security Alert'
  ];

  users = [
    { id: 1, name: 'Super Admin', role: 'super-admin' },
    { id: 2, name: 'Pharmacy Admin', role: 'pharmacy-admin' },
    { id: 3, name: 'John Doe', role: 'pharmacist' }
  ];

  filters = {
    eventType: '',
    user: '',
    dateFrom: '',
    dateTo: ''
  };

  allLogs = [
    {
      id: 1,
      timestamp: new Date('2023-06-15T09:30:00'),
      eventType: 'Login',
      severity: 'medium',
      user: { id: 1, name: 'Super Admin', role: 'super-admin' },
      description: 'Successful login from 192.168.1.1',
      ipAddress: '192.168.1.1'
    },
    {
      id: 2,
      timestamp: new Date('2023-06-15T10:15:00'),
      eventType: 'System Setting Changed',
      severity: 'high',
      user: { id: 1, name: 'Super Admin', role: 'super-admin' },
      description: 'Changed password policy to High',
      ipAddress: '192.168.1.1'
    },
    // More log entries...
  ];

  filteredLogs = [...this.allLogs];

  pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
    startIndex: 0,
    endIndex: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredLogs = this.allLogs.filter(log => {
      const matchesEventType = !this.filters.eventType || 
                             log.eventType === this.filters.eventType;
      const matchesUser = !this.filters.user || 
                        log.user.id.toString() === this.filters.user;
      const matchesDateFrom = !this.filters.dateFrom || 
                            new Date(log.timestamp) >= new Date(this.filters.dateFrom);
      const matchesDateTo = !this.filters.dateTo || 
                          new Date(log.timestamp) <= new Date(this.filters.dateTo + 'T23:59:59');
      
      return matchesEventType && matchesUser && matchesDateFrom && matchesDateTo;
    });

    this.updatePagination();
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredLogs.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    this.pagination.startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    this.pagination.endIndex = Math.min(
      this.pagination.startIndex + this.pagination.itemsPerPage - 1,
      this.pagination.totalItems - 1
    );
    
    // In real app, you would fetch paginated data from server
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > this.pagination.totalPages) {
      endPage = this.pagination.totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToPage(page: number): void {
    this.pagination.currentPage = page;
    this.updatePagination();
  }

  previousPage(): void {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.pagination.currentPage < this.pagination.totalPages) {
      this.pagination.currentPage++;
      this.updatePagination();
    }
  }

  refreshLogs(): void {
    console.log('Refreshing audit logs...');
    // In real app: this.auditLogService.getLogs().subscribe(logs => this.allLogs = logs);
    this.applyFilters();
  }

  exportLogs(): void {
    console.log('Exporting logs...');
    // Implement CSV/PDF export functionality
  }

}

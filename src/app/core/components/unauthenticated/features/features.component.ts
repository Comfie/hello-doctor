import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [NgFor],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  features = [
    {
      title: 'Digital Prescription Management',
      description: 'Upload, create, and manage prescriptions digitally with our secure platform.',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      highlights: [
        'Scan paper prescriptions',
        'e-Prescriptions from doctors',
        'Centralized medication history'
      ]
    },
    {
      title: 'Family Healthcare Hub',
      description: 'Manage healthcare for your entire family from one secure account.',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      highlights: [
        'Add multiple beneficiaries',
        'Permission controls',
        'Shared medical records'
      ]
    },
    {
      title: 'Pharmacy Integration',
      description: 'Seamless connection with your preferred pharmacies for medication fulfillment.',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      highlights: [
        'Real-time inventory checks',
        'Automated refill reminders',
        'Multiple pharmacy options'
      ]
    },
    {
      title: 'Secure Health Records',
      description: 'HIPAA-compliant storage for all your medical documents.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      highlights: [
        'Encrypted data storage',
        'Role-based access control',
        'Audit logging'
      ]
    },
    {
      title: 'Telehealth Coordination',
      description: 'Connect with healthcare providers through our integrated platform.',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z',
      highlights: [
        'Virtual consultations',
        'Prescription coordination',
        'Secure messaging'
      ]
    },
    {
      title: 'Medication Tracking',
      description: 'Never miss a dose with our intelligent medication management system.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      highlights: [
        'Dosage reminders',
        'Interaction warnings',
        'Adherence reporting'
      ]
    }
  ];

  stats = [
    { value: '10,000+', label: 'Happy Patients' },
    { value: '500+', label: 'Partner Pharmacies' },
    { value: '24/7', label: 'Support Available' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  testimonials = [
    {
      quote: "Hello Doctor has revolutionized how our family manages medications. No more lost prescriptions!",
      name: "Sarah Johnson",
      role: "Parent of three",
      avatar: "/assets/testimonials/avatar1.jpg"
    },
    {
      quote: "As a pharmacist, the integration with our inventory system saves hours each week.",
      name: "Michael Chen",
      role: "Pharmacy Owner",
      avatar: "/assets/testimonials/avatar2.jpg"
    }
  ];
}
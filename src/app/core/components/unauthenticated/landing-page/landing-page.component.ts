// landing-page.component.ts
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [NgFor, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  features = [
    {
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      title: 'Digital Prescriptions',
      description: 'Upload or create prescriptions digitally and have them delivered to your preferred pharmacy'
    },
    {
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
      title: 'Family Management',
      description: 'Manage healthcare for your entire family from one account'
    },
    {
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      title: 'Easy Payments',
      description: 'Secure online payments with multiple payment options'
    }
  ];

  testimonials = [
    {
      quote: "Hello Doctor has revolutionized how our pharmacy operates. Prescription management is now seamless!",
      name: "Sarah Johnson",
      role: "Pharmacy Owner",
      avatar: "/assets/avatars/avatar1.jpg"
    },
    {
      quote: "As a busy parent, managing my family's prescriptions has never been easier. Highly recommended!",
      name: "Michael Chen",
      role: "Parent",
      avatar: "/assets/avatars/avatar2.jpg"
    },
    {
      quote: "The platform saves me hours each week. I can now focus more on patient care than paperwork.",
      name: "Dr. Emily Rodriguez",
      role: "General Practitioner",
      avatar: "/assets/avatars/avatar3.jpg"
    }
  ];

  stats = [
    { value: "10,000+", label: "Happy Patients" },
    { value: "500+", label: "Partner Pharmacies" },
    { value: "24/7", label: "Support Available" },
    { value: "98%", label: "Satisfaction Rate" }
  ];
}
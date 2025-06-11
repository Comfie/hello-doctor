// how-it-works.component.ts
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  imports: [NgIf, NgFor],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {
  steps = [
    {
      title: "Create Your Account",
      description: "Sign up in minutes as a patient, pharmacy, or healthcare provider",
      icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
      image: "/assets/how-it-works/signup.jpg",
      roles: ["patient", "pharmacy", "doctor"]
    },
    {
      title: "Upload or Create Prescriptions",
      description: "Patients can upload prescriptions or doctors can create them digitally",
      icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
      image: "/assets/how-it-works/prescription.jpg",
      roles: ["patient", "doctor"]
    },
    {
      title: "Pharmacy Receives & Prepares",
      description: "Your chosen pharmacy gets the prescription and prepares your medications",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      image: "/assets/how-it-works/pharmacy.jpg",
      roles: ["pharmacy"]
    },
    {
      title: "Delivery or Pickup",
      description: "Get medications delivered or pick them up at your convenience",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      image: "/assets/how-it-works/delivery.jpg",
      roles: ["patient"]
    }
  ];

  userTypes = [
    {
      name: "Patients",
      description: "Manage prescriptions for you and your family with ease",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      features: [
        "Upload prescriptions from any device",
        "Add family members to your account",
        "Track medication history",
        "Get refill reminders"
      ]
    },
    {
      name: "Pharmacies",
      description: "Streamline your prescription management and inventory",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      features: [
        "Digital prescription processing",
        "Inventory management tools",
        "Patient communication system",
        "Billing and reporting"
      ]
    },
    {
      name: "Doctors",
      description: "Create and manage prescriptions with full digital workflow",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      features: [
        "e-Prescription creation",
        "Patient medical history access",
        "Pharmacy network integration",
        "Digital signature support"
      ]
    }
  ];

  faqs = [
    {
      question: "How do I upload a prescription?",
      answer: "Simply take a photo or scan your prescription and upload it through our secure portal. Our system will automatically extract the key details for pharmacy processing."
    },
    {
      question: "Can I use this for my entire family?",
      answer: "Yes! You can add family members as beneficiaries under your account and manage all prescriptions from one dashboard."
    },
    {
      question: "Is my health information secure?",
      answer: "Absolutely. We use HIPAA-compliant encryption and follow strict healthcare data protection protocols to ensure your information remains private and secure."
    },
    {
      question: "How do pharmacies receive the prescriptions?",
      answer: "Once uploaded or created by a doctor, prescriptions are immediately available to your selected pharmacy through our secure healthcare network."
    }
  ];
}
// faq.component.ts
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [NgFor],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  categories = [
    {
      name: 'General',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z',
      questions: [
        {
          question: 'What is Hello Doctor?',
          answer: 'Hello Doctor is a comprehensive healthcare platform that connects patients, pharmacies, and doctors through a secure digital system for prescription management and medication delivery.'
        },
        {
          question: 'Is my health information secure?',
          answer: 'Absolutely. We use HIPAA-compliant encryption and follow strict healthcare data protection protocols to ensure your information remains private and secure.'
        },
        {
          question: 'How much does it cost to use Hello Doctor?',
          answer: 'For patients, the basic service is free. Premium features may have associated costs. Pharmacies and doctors have subscription plans based on their needs.'
        }
      ]
    },
    {
      name: 'Patients',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      questions: [
        {
          question: 'How do I upload a prescription?',
          answer: 'You can take a photo of your prescription using our mobile app or upload a scanned copy through our website. Our system will automatically extract the key details for processing.'
        },
        {
          question: 'Can I manage prescriptions for my family?',
          answer: 'Yes! You can add family members as beneficiaries under your account and manage all prescriptions from one dashboard.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and HSA/FSA cards where applicable.'
        }
      ]
    },
    {
      name: 'Pharmacies',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      questions: [
        {
          question: 'How do we receive prescriptions?',
          answer: 'Prescriptions are sent to your pharmacy dashboard immediately after they are uploaded or created by doctors. You\'ll receive notifications for new prescriptions.'
        },
        {
          question: 'Can we integrate with our existing inventory system?',
          answer: 'Yes, we offer API integrations with most major pharmacy inventory management systems.'
        },
        {
          question: 'How are payments processed?',
          answer: 'Patients pay through our secure platform, and funds are transferred to your account minus a small processing fee.'
        }
      ]
    },
    {
      name: 'Doctors',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      questions: [
        {
          question: 'How do I create digital prescriptions?',
          answer: 'Our e-prescription tool allows you to select medications, dosages, and instructions with our intuitive interface. All prescriptions are digitally signed.'
        },
        {
          question: 'Can I access patient medical history?',
          answer: 'Yes, with patient consent you can view their complete medication history within our system.'
        },
        {
          question: 'Is there a way to track if prescriptions were filled?',
          answer: 'Our system provides real-time updates on prescription status from the pharmacy.'
        }
      ]
    },
    {
      name: 'Technical',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      questions: [
        {
          question: 'What browsers are supported?',
          answer: 'Hello Doctor works on Chrome, Firefox, Safari, Edge, and other modern browsers. We recommend using the latest version for optimal performance.'
        },
        {
          question: 'Do you have a mobile app?',
          answer: 'Yes, we have iOS and Android apps available for download in their respective app stores.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page and follow the instructions sent to your registered email.'
        }
      ]
    }
  ];

  popularQuestions = [
    {
      question: 'How quickly can I get my medications?',
      answer: 'Delivery times vary by pharmacy, but most medications are delivered within 1-3 business days. Some pharmacies offer same-day delivery in certain areas.'
    },
    {
      question: 'Can I use my insurance with Hello Doctor?',
      answer: 'Yes, we work with most major insurance providers. You can enter your insurance information during checkout or in your account settings.'
    },
    {
      question: 'What if I have questions about my medication?',
      answer: 'Our partnered pharmacists are available 24/7 to answer medication questions through our secure messaging system.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team 24/7 through the in-app chat, by email at support@hellodoctor.com, or by phone at 1-800-HELLO-DR.'
    }
  ];
}
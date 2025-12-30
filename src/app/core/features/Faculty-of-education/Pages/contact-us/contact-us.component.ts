import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import {
  ContactsService,
  Contact,
  SocialMediaLink,
} from '../../Services/real-services/contacts.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  private readonly contactsService = inject(ContactsService);
  private readonly sanitizer = inject(DomSanitizer);

  // Signals for reactive state management
  contactInfo = signal<Contact | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Computed signal for social media links
  socialMediaLinks = computed<SocialMediaLink[]>(() => {
    const contact = this.contactInfo();
    if (!contact) return [];

    const links: SocialMediaLink[] = [];

    if (contact.facebook && contact.facebook !== '#') {
      links.push({
        platform: 'فيسبوك',
        url: contact.facebook,
        icon: 'pi pi-facebook',
      });
    }
    if (contact.twitter && contact.twitter !== '#') {
      links.push({
        platform: 'تويتر',
        url: contact.twitter,
        icon: 'pi pi-twitter',
      });
    }
    if (contact.instagram && contact.instagram !== '#') {
      links.push({
        platform: 'انستجرام',
        url: contact.instagram,
        icon: 'pi pi-instagram',
      });
    }
    if (contact.linkedIn && contact.linkedIn !== '#') {
      links.push({
        platform: 'لينكدإن',
        url: contact.linkedIn,
        icon: 'pi pi-linkedin',
      });
    }
    if (contact.youTube && contact.youTube !== '#') {
      links.push({
        platform: 'يوتيوب',
        url: contact.youTube,
        icon: 'pi pi-youtube',
      });
    }
    if (contact.whatsApp && contact.whatsApp !== '#') {
      links.push({
        platform: 'واتساب',
        url: contact.whatsApp,
        icon: 'pi pi-whatsapp',
      });
    }

    return links;
  });

  // Computed signal for safe map URL
  mapUrl = computed<SafeResourceUrl | null>(() => {
    const contact = this.contactInfo();
    if (!contact?.mapLocation || contact.mapLocation === '#') return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(contact.mapLocation);
  });

  // Contact form data
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitting = false;
  submitSuccess = false;

  ngOnInit(): void {
    this.loadContactInfo();
  }

  private loadContactInfo(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.contactsService.getAllContacts().subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          this.contactInfo.set(response.data[0]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('حدث خطأ في تحميل بيانات الاتصال');
        this.isLoading.set(false);
        console.error('Error loading contact info:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      this.isSubmitting = true;
      // Simulate form submission - you can implement actual submission logic here
      setTimeout(() => {
        this.submitSuccess = true;
        this.resetForm();
        this.isSubmitting = false;
      }, 1500);
    }
  }

  isValidForm(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim()
    );
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  copyToClipboard(text: string): void {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    });
  }
}

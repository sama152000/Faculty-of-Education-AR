import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../Services/contact.service';
import { ContactInfo } from '../../model/contact.model';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, FooterComponent],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactInfo!: ContactInfo;
  
  // Contact form data
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;
  submitSuccess = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      this.isSubmitting = true;
      
      this.contactService.sendMessage(this.contactForm).subscribe({
        next: (success) => {
          if (success) {
            this.submitSuccess = true;
            this.resetForm();
          }
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
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
      message: ''
    };
  }

  openLink(url: string): void {
    window.open(url, '_blank');
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast notification here
      console.log('Copied to clipboard:', text);
    });
  }
}
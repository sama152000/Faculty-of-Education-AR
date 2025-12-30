import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../Services/navigation.service';
import {
  NavItem,
  SocialLink,
  ContactInfo,
} from '../../../model/navigation.model';
import {
  LogosService,
  LogoAttachment,
} from '../../../Services/real-services/logos.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  private readonly logosService = inject(LogosService);

  socialLinks: SocialLink[] = [];
  contactInfo: ContactInfo | null = null;
  quickLinks: any[] = [];
  footerNavItems: NavItem[] = [];
  currentYear = new Date().getFullYear();

  // Logo signal
  logo = signal<LogoAttachment | null>(null);
  logoUrl = signal<string>(''); // fallback

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.socialLinks = this.navigationService.getSocialLinks();
    this.contactInfo = this.navigationService.getContactInfo();
    this.quickLinks = this.navigationService.getFooterQuickLinks();
    this.footerNavItems = this.navigationService.getFooterNavItems();

    // Load logo from API
    this.loadLogo();
  }

  private loadLogo(): void {
    this.logosService.getAllLogos().subscribe({
      next: (response) => {
        if (response.success && response.data && response.data.length > 0) {
          this.logo.set(response.data[0]);
          this.logoUrl.set(response.data[0].url);
        }
      },
      error: (error) => {
        console.error('Error loading logo:', error);
        // Keep fallback logo
      },
    });
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }
}

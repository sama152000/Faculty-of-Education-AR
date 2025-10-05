import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../Services/navigation.service';
import { NavItem, SocialLink, ContactInfo } from '../../../model/navigation.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  socialLinks: SocialLink[] = [];
  contactInfo: ContactInfo | null = null;
  quickLinks: any[] = [];
  footerNavItems: NavItem[] = [];
  currentYear = new Date().getFullYear();

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.socialLinks = this.navigationService.getSocialLinks();
    this.contactInfo = this.navigationService.getContactInfo();
    this.quickLinks = this.navigationService.getFooterQuickLinks();
    this.footerNavItems = this.navigationService.getFooterNavItems();
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }
}
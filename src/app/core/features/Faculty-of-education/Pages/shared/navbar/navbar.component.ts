import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../Services/navigation.service';
import { NavItem } from '../../../model/navigation.model';
import {
  LogosService,
  LogoAttachment,
} from '../../../Services/real-services/logos.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private readonly logosService = inject(LogosService);

  navItems: NavItem[] = [];
  firstRowItems: NavItem[] = [];
  secondRowItems: NavItem[] = [];
  isMenuOpen = false;
  openDropdowns: Set<string> = new Set();
  mainIds: Set<string> = new Set();

  // Logo signal
  logo = signal<LogoAttachment | null>(null);
  logoUrl = signal<string>(''); // fallback

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navItems = this.navigationService.getMainNavItems();
    this.mainIds = new Set(this.navItems.map((item) => item.id));
    const mid = Math.ceil(this.navItems.length / 2);
    this.firstRowItems = this.navItems.slice(0, mid);
    this.secondRowItems = this.navItems.slice(mid);

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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleDropdown(itemId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.mainIds.has(itemId)) {
      this.openDropdowns.clear();
    }

    if (this.openDropdowns.has(itemId)) {
      this.openDropdowns.delete(itemId);
    } else {
      this.openDropdowns.add(itemId);
    }
  }

  isDropdownOpen(itemId: string): boolean {
    return this.openDropdowns.has(itemId);
  }

  closeAllDropdowns(): void {
    this.openDropdowns.clear();
    this.closeMenu();
  }

  navigateToUniversity(): void {
    window.open('http://www.luxor.edu.eg/#/', '_blank');
  }

  navigateTojornal(): void {
    window.open('https://jedul.journals.ekb.eg/', '_blank');
  }
  languageswitcher(): void {
    window.open(
      'https://faculty-of-education-en-943s.vercel.app/home/',
      '_blank'
    );
  }

  handleItemClick(item: NavItem, event?: Event): void {
    if (item.external && item.url) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      window.open(item.url, '_blank');
      this.closeMenu();
      return;
    }

    if (item.children && item.children.length > 0) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      // For the 'programs' menu we want children visible immediately when opened
      // and avoid toggling inner sub-dropdowns on parent click.
      if (item.id === 'programs') {
        // open only the main programs dropdown (close others)
        this.openDropdowns.clear();
        this.openDropdowns.add(item.id);
      } else {
        this.toggleDropdown(item.id);
      }
      return;
    }

    // Close menu after navigation for regular links
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const navbar = target.closest('.navbar-container');
    if (!navbar) {
      this.closeAllDropdowns();
    }
  }
}

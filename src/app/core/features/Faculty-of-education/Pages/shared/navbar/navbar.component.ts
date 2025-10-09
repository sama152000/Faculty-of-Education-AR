import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../../../Services/navigation.service';
import { NavItem } from '../../../model/navigation.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navItems: NavItem[] = [];
  firstRowItems: NavItem[] = [];
  secondRowItems: NavItem[] = [];
  isMenuOpen = false;
  openDropdowns: Set<string> = new Set();
  mainIds: Set<string> = new Set();

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navItems = this.navigationService.getMainNavItems();
    this.mainIds = new Set(this.navItems.map(item => item.id));
    const mid = Math.ceil(this.navItems.length / 2);
    this.firstRowItems = this.navItems.slice(0, mid);
    this.secondRowItems = this.navItems.slice(mid);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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
  }

  navigateToUniversity(): void {
    window.open('http://www.luxor.edu.eg/#/', '_blank');
  }

  navigateTojornal():void{
    window.open('https://jedul.journals.ekb.eg/', '_blank');
  }

  handleItemClick(item: NavItem, event?: Event): void {
    if (item.external && item.url) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      window.open(item.url, '_blank');
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

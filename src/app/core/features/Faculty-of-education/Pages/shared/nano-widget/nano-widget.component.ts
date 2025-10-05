import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-nano-widget',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nano-widget.component.html',
  styleUrls: ['./nano-widget.component.css']
})
export class NanoWidgetComponent {
  navItems: NavItem[] = [
    {
      id: 'home',
      icon: 'pi pi-home',
      label: 'الرئيسية',
      route: '/home',
      color: 'var(--nano-color)'
    },
    {
      id: 'about',
      icon: 'pi pi-info-circle',
      label: 'عن الكلية',
      route: '/about',
      color: 'var(--nano-color)'
    },
    {
      id: 'departments',
      icon: 'pi pi-building',
      label: 'الأقسام',
      route: '/departments',
      color: 'var(--nano-color)'
    },
    {
      id: 'staff',
      icon: 'pi pi-users',
      label: 'الكوادر',
      route: '/staff',
      color: 'var(--nano-color)'
    },
    {
      id: 'news',
      icon: 'pi pi-calendar',
      label: 'الأخبار',
      route: '/news',
      color: 'var(--nano-color)'
    },
    {
      id: 'contact',
      icon: 'pi pi-phone',
      label: 'اتصل بنا',
      route: '/contact',
      color: 'var(--nano-color)'
    }
  ];

  hoveredItem: string | null = null;

  onItemHover(itemId: string): void {
    this.hoveredItem = itemId;
  }

  onItemLeave(): void {
    this.hoveredItem = null;
  }
}
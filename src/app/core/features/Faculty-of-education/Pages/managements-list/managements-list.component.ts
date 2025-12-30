import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ManagementsService } from '../../Services/real-services/managements.service';
import { Management } from '../../model/management.model';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';

@Component({
  selector: 'app-managements-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './managements-list.component.html',
  styleUrls: ['./managements-list.component.css'],
})
export class ManagementsListComponent implements OnInit {
  private readonly managementsService = inject(ManagementsService);
  private readonly router = inject(Router);

  // Signals for reactive state
  managements = signal<Management[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadManagements();
  }

  private loadManagements(): void {
    this.isLoading.set(true);
    this.managementsService.getAllManagments().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.managements.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading managements:', error);
        this.isLoading.set(false);
      },
    });
  }

  getManagementTitle(mgmt: Management): string {
    return mgmt.managementTitle || '';
  }

  getManagementDescription(mgmt: Management): string {
    const content = mgmt.content || mgmt.mission || '';
    if (!content) return '';
    const stripped = content.replace(/<[^>]*>/g, '');
    return stripped.length > 150
      ? stripped.substring(0, 150) + '...'
      : stripped;
  }

  getManagementImage(mgmt: Management): string {
    if (mgmt.managementAttachments && mgmt.managementAttachments.length > 0) {
      return mgmt.managementAttachments[0].url;
    }
    return 'assets/images/placeholder-management.jpg';
  }

  getManagementIcon(index: number): string {
    const icons = [
      'pi-briefcase',
      'pi-users',
      'pi-cog',
      'pi-chart-line',
      'pi-building',
      'pi-globe',
    ];
    return `pi ${icons[index % icons.length]}`;
  }

  navigateToDetails(mgmt: Management): void {
    // Navigate to management details if route exists, otherwise stay
    this.router.navigate(['/management-details', mgmt.id]);
  }
}

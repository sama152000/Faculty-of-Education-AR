import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ManagementsService } from '../../../Services/real-services/managements.service';
import { Management } from '../../../model/management.model';
import { PageHeaderComponent } from '../page-header/page-header.component';

interface ManagementNavigation {
  previous: Management | null;
  next: Management | null;
}

@Component({
  selector: 'app-management-details',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './management-details.component.html',
  styleUrls: ['./management-details.component.css'],
})
export class ManagementDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly managementsService = inject(ManagementsService);

  // Signals for reactive state
  currentManagement = signal<Management | null>(null);
  allManagements = signal<Management[]>([]);
  loading = signal<boolean>(true);

  // Computed signal for navigation
  navigation = computed<ManagementNavigation>(() => {
    const current = this.currentManagement();
    const all = this.allManagements();
    if (!current || all.length === 0) return { previous: null, next: null };

    const currentIndex = all.findIndex((m) => m.id === current.id);
    return {
      previous: currentIndex > 0 ? all[currentIndex - 1] : null,
      next: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
    };
  });

  // Default icons
  private readonly managementIcons = [
    'pi pi-briefcase',
    'pi pi-users',
    'pi pi-cog',
    'pi pi-chart-line',
    'pi pi-building',
    'pi pi-globe',
  ];

  ngOnInit(): void {
    this.loadManagements();
  }

  private loadManagements(): void {
    this.loading.set(true);
    this.managementsService.getAllManagments().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allManagements.set(response.data);

          this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
              this.loadManagementById(id);
            } else if (response.data.length > 0) {
              this.router.navigate(['/managements', response.data[0].id]);
            }
          });
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading managements:', error);
        this.loading.set(false);
      },
    });
  }

  private loadManagementById(id: string): void {
    const management = this.allManagements().find((m) => m.id === id);
    if (management) {
      this.currentManagement.set(management);
    } else {
      // Try to fetch from API
      this.managementsService.getById(id).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.currentManagement.set(response.data);
          } else if (this.allManagements().length > 0) {
            this.router.navigate(['/managements', this.allManagements()[0].id]);
          }
        },
        error: () => {
          if (this.allManagements().length > 0) {
            this.router.navigate(['/managements', this.allManagements()[0].id]);
          } else {
            this.router.navigate(['/managements']);
          }
        },
      });
    }
  }

  navigateToManagement(management: Management): void {
    this.router.navigate(['/managements', management.id]);
    this.currentManagement.set(management);
  }

  navigateToPrevious(): void {
    const nav = this.navigation();
    if (nav.previous) {
      this.navigateToManagement(nav.previous);
    }
  }

  navigateToNext(): void {
    const nav = this.navigation();
    if (nav.next) {
      this.navigateToManagement(nav.next);
    }
  }

  getManagementTitle(management: Management | null): string {
    return management?.managementTitle || '';
  }

  getManagementContent(management: Management | null): string {
    return management?.content || '';
  }

  getManagementGoals(management: Management | null): string[] {
    if (!management?.goals) return [];
    return management.goals.map((g) => g.goalName || '').filter((g) => g);
  }

  getManagementIcon(index: number): string {
    return this.managementIcons[index % this.managementIcons.length];
  }

  getManagementImage(management: Management | null): string {
    if (
      management?.managementAttachments &&
      management.managementAttachments.length > 0
    ) {
      return management.managementAttachments[0].url;
    }
    return '';
  }

  getVision(management: Management | null): string {
    return management?.vision || '';
  }

  getMission(management: Management | null): string {
    return management?.mission || '';
  }

  getHistory(management: Management | null): string {
    return management?.history || '';
  }

  isCurrentManagement(management: Management): boolean {
    return this.currentManagement()?.id === management.id;
  }
}

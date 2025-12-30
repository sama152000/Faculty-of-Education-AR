import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '../../Services/real-services/sectors/sectors.service';
import { Sector } from '../../model/sector.model';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';

interface SectorNavigation {
  previous: Sector | null;
  next: Sector | null;
}

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css'],
})
export class SectorsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sectorsService = inject(SectorsService);

  // Signals for reactive state
  currentSector = signal<Sector | null>(null);
  allSectors = signal<Sector[]>([]);
  loading = signal<boolean>(true);

  // Computed signal for navigation
  navigation = computed<SectorNavigation>(() => {
    const current = this.currentSector();
    const all = this.allSectors();
    if (!current || all.length === 0) return { previous: null, next: null };

    const currentIndex = all.findIndex((s) => s.id === current.id);
    return {
      previous: currentIndex > 0 ? all[currentIndex - 1] : null,
      next: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
    };
  });

  ngOnInit(): void {
    this.loadSectors();
  }

  private loadSectors(): void {
    this.loading.set(true);
    this.sectorsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allSectors.set(response.data);

          this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
              this.loadSectorById(id);
            } else if (response.data.length > 0) {
              this.currentSector.set(response.data[0]);
            }
          });
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading sectors:', error);
        this.loading.set(false);
      },
    });
  }

  private loadSectorById(id: string): void {
    const sector = this.allSectors().find((s) => s.id === id);
    if (sector) {
      this.currentSector.set(sector);
    } else {
      this.sectorsService.getById(id).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.currentSector.set(response.data);
          } else if (this.allSectors().length > 0) {
            this.currentSector.set(this.allSectors()[0]);
          }
        },
        error: () => {
          if (this.allSectors().length > 0) {
            this.currentSector.set(this.allSectors()[0]);
          }
        },
      });
    }
  }

  navigateToSector(sector: Sector): void {
    this.router.navigate(['/sectors', sector.id]);
    this.currentSector.set(sector);
  }

  navigateToPrevious(): void {
    const nav = this.navigation();
    if (nav.previous) {
      this.navigateToSector(nav.previous);
    }
  }

  navigateToNext(): void {
    const nav = this.navigation();
    if (nav.next) {
      this.navigateToSector(nav.next);
    }
  }

  getSectorTitle(sector: Sector | null): string {
    return sector?.name || '';
  }

  getSectorViceDean(sector: Sector | null): string {
    return sector?.subTitle || '';
  }

  getSectorGoals(sector: Sector | null): string[] {
    if (!sector?.goals) return [];
    return sector.goals.map((g) => g.goalName);
  }

  getAbout(sector: Sector | null): string {
    return sector?.about || '';
  }

  getVision(sector: Sector | null): string {
    return sector?.vision || '';
  }

  getMission(sector: Sector | null): string {
    return sector?.mission || '';
  }

  isCurrentSector(sector: Sector): boolean {
    return this.currentSector()?.id === sector.id;
  }
}

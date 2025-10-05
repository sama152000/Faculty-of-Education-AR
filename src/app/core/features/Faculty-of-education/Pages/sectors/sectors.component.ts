import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SectorService } from '../../Services/sector.service';
import { Sector, SectorNavigation } from '../../model/sector.model';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  currentSector: Sector | null = null;
  allSectors: Sector[] = [];
  navigation: SectorNavigation = { previous: null, next: null };
  currentLanguage = 'en';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.loadAllSectors();
    
    this.route.url.subscribe(urlSegments => {
      const fullPath = urlSegments.map(segment => segment.path).join('/');
      this.loadSectorByRoute(fullPath);
    });
  }

  loadAllSectors(): void {
    this.sectorService.getAllSectors().subscribe(sectors => {
      this.allSectors = sectors;
    });
  }

  loadSectorByRoute(route: string): void {
    this.loading = true;
    const tryRoute = (r: string) => this.sectorService.getSectorByRoute(r).toPromise();

    (async () => {
      try {
        // normalize input: remove leading slash if present
        let normalized = route.startsWith('/') ? route.substring(1) : route;

        // attempt 1: exact normalized route
        let sector = await tryRoute(normalized);
        if (sector) {
          this.currentSector = sector;
          this.loadNavigation(sector.id);
          this.loading = false;
          return;
        }

        // attempt 2: strip trailing segment (possible id)
        const lastSlashIndex = normalized.lastIndexOf('/');
        if (lastSlashIndex > 0) {
          const baseRoute = normalized.substring(0, lastSlashIndex);
          sector = await tryRoute(baseRoute);
          if (sector) {
            this.currentSector = sector;
            this.loadNavigation(sector.id);
            this.loading = false;
            return;
          }
        }

        // attempt 3: try adding/removing management prefix variants
        if (!normalized.startsWith('management/')) {
          sector = await tryRoute('management/' + normalized);
          if (sector) {
            this.currentSector = sector;
            this.loadNavigation(sector.id);
            this.loading = false;
            return;
          }
        } else {
          // also try removing 'management/' prefix if present
          const withoutPrefix = normalized.replace(/^management\//, '');
          sector = await tryRoute(withoutPrefix);
          if (sector) {
            this.currentSector = sector;
            this.loadNavigation(sector.id);
            this.loading = false;
            return;
          }
        }

        // final fallback: navigate home
        this.router.navigate(['/']);
      } catch (e) {
        // if any error, fallback to home
        this.router.navigate(['/']);
      } finally {
        this.loading = false;
      }
    })();
  }

  loadNavigation(sectorId: string): void {
    this.sectorService.getSectorNavigation(sectorId).subscribe(navigation => {
      this.navigation = navigation;
    });
  }

  navigateToSector(sector: Sector): void {
    this.router.navigate([sector.route]);
  }

  navigateToPrevious(): void {
    if (this.navigation.previous) {
      this.navigateToSector(this.navigation.previous);
    }
  }

  navigateToNext(): void {
    if (this.navigation.next) {
      this.navigateToSector(this.navigation.next);
    }
  }

  getSectorTitle(sector: Sector): string {
    return sector.title;
  }

  getSectorViceDean(sector: Sector): string {
    return sector.viceDean;
  }

  getSectorObjectives(sector: Sector): string[] {
    return sector.objectives;
  }

  getSectorServices(sector: Sector): string[] {
    return sector.services;
  }

  isCurrentSector(sector: Sector): boolean {
    return this.currentSector?.id === sector.id;
  }
}
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CentersService } from '../../Services/real-services/centers/centers.service';
import {
  UnitService,
  Unit,
} from '../../Services/real-services/units/unit.service';
import { Center } from '../../model/centers.model';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';

// Combined type for both centers and units
type FacilityItem = {
  id: string;
  name: string;
  type: 'center' | 'unit';
  about?: string;
  vision?: string;
  mission?: string;
  goals?: string[];
  imageUrl?: string;
};

interface FacilityNavigation {
  previous: FacilityItem | null;
  next: FacilityItem | null;
}

@Component({
  selector: 'app-centers-units',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './centers-units.component.html',
  styleUrls: ['./centers-units.component.css'],
})
export class CentersUnitsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly centersService = inject(CentersService);
  private readonly unitsService = inject(UnitService);

  // Signals for reactive state
  currentItem = signal<FacilityItem | null>(null);
  allItems = signal<FacilityItem[]>([]);
  loading = signal<boolean>(true);
  activeTab = signal<'all' | 'centers' | 'units'>('all');

  // Computed signal for filtered items
  filteredItems = computed(() => {
    const tab = this.activeTab();
    const all = this.allItems();
    if (tab === 'all') return all;
    return all.filter(
      (item) => item.type === (tab === 'centers' ? 'center' : 'unit')
    );
  });

  // Computed signal for navigation
  navigation = computed<FacilityNavigation>(() => {
    const current = this.currentItem();
    const all = this.allItems();
    if (!current || all.length === 0) return { previous: null, next: null };

    const currentIndex = all.findIndex(
      (item) => item.id === current.id && item.type === current.type
    );
    return {
      previous: currentIndex > 0 ? all[currentIndex - 1] : null,
      next: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
    };
  });

  // Icons
  private readonly facilityIcons = {
    center: 'pi pi-building',
    unit: 'pi pi-sitemap',
  };

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    let centersLoaded = false;
    let unitsLoaded = false;
    const items: FacilityItem[] = [];

    // Load Centers
    this.centersService.getAllCenters().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          response.data.forEach((center) => {
            items.push(this.mapCenterToFacility(center));
          });
        }
        centersLoaded = true;
        this.checkLoadComplete(centersLoaded, unitsLoaded, items);
      },
      error: (error) => {
        console.error('Error loading centers:', error);
        centersLoaded = true;
        this.checkLoadComplete(centersLoaded, unitsLoaded, items);
      },
    });

    // Load Units
    this.unitsService.getAllUnits().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          response.data.forEach((unit) => {
            items.push(this.mapUnitToFacility(unit));
          });
        }
        unitsLoaded = true;
        this.checkLoadComplete(centersLoaded, unitsLoaded, items);
      },
      error: (error) => {
        console.error('Error loading units:', error);
        unitsLoaded = true;
        this.checkLoadComplete(centersLoaded, unitsLoaded, items);
      },
    });
  }

  private checkLoadComplete(
    centersLoaded: boolean,
    unitsLoaded: boolean,
    items: FacilityItem[]
  ): void {
    if (centersLoaded && unitsLoaded) {
      this.allItems.set(items);
      this.loading.set(false);

      // Check for route params
      this.route.params.subscribe((params) => {
        const id = params['id'];
        const type = params['type'];
        if (id && type) {
          const item = items.find((i) => i.id === id && i.type === type);
          if (item) {
            this.currentItem.set(item);
          } else if (items.length > 0) {
            this.currentItem.set(items[0]);
          }
        } else if (items.length > 0) {
          this.currentItem.set(items[0]);
        }
      });
    }
  }

  private mapCenterToFacility(center: Center): FacilityItem {
    return {
      id: center.id,
      name: center.centerName,
      type: 'center',
      about: center.about,
      vision: center.vision,
      mission: center.mission,
      goals: center.goals?.map((g) => g.goalName || '') || [],
      imageUrl: center.centerAttachments?.[0]?.url,
    };
  }

  private mapUnitToFacility(unit: Unit): FacilityItem {
    return {
      id: unit.id,
      name: unit.unitTitle,
      type: 'unit',
      about: unit.content,
      vision: unit.vision,
      mission: unit.mission,
      goals: unit.goals?.map((g) => g.goalName) || [],
      imageUrl: unit.unitAttachments?.[0]?.url,
    };
  }

  selectItem(item: FacilityItem): void {
    this.currentItem.set(item);
    this.router.navigate(['/centers-units', item.type, item.id]);
  }

  navigateToPrevious(): void {
    const nav = this.navigation();
    if (nav.previous) {
      this.selectItem(nav.previous);
    }
  }

  navigateToNext(): void {
    const nav = this.navigation();
    if (nav.next) {
      this.selectItem(nav.next);
    }
  }

  setActiveTab(tab: 'all' | 'centers' | 'units'): void {
    this.activeTab.set(tab);
  }

  getItemIcon(item: FacilityItem): string {
    return this.facilityIcons[item.type];
  }

  getTypeLabel(type: 'center' | 'unit'): string {
    return type === 'center' ? 'مركز' : 'وحدة';
  }

  isCurrentItem(item: FacilityItem): boolean {
    const current = this.currentItem();
    return current?.id === item.id && current?.type === item.type;
  }
}

import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  DepartmentsService,
  Department,
} from '../../../Services/real-services/departments/departments.service';
import { PageHeaderComponent } from '../page-header/page-header.component';

interface DepartmentNavigation {
  previous: Department | null;
  next: Department | null;
}

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
})
export class DepartmentDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly departmentsService = inject(DepartmentsService);

  // Signals for reactive state
  currentDepartment = signal<Department | null>(null);
  allDepartments = signal<Department[]>([]);
  loading = signal<boolean>(true);

  // Computed signal for navigation
  navigation = computed<DepartmentNavigation>(() => {
    const current = this.currentDepartment();
    const all = this.allDepartments();
    if (!current || all.length === 0) return { previous: null, next: null };

    const currentIndex = all.findIndex((d) => d.id === current.id);
    return {
      previous: currentIndex > 0 ? all[currentIndex - 1] : null,
      next: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
    };
  });

  // Default icons
  private readonly departmentIcons = [
    'pi pi-book',
    'pi pi-graduation-cap',
    'pi pi-users',
    'pi pi-briefcase',
    'pi pi-globe',
    'pi pi-star',
  ];

  ngOnInit(): void {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.loading.set(true);
    this.departmentsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allDepartments.set(response.data);

          this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
              this.loadDepartmentById(id);
            } else if (response.data.length > 0) {
              this.router.navigate([
                '/department-details',
                response.data[0].id,
              ]);
            }
          });
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.loading.set(false);
      },
    });
  }

  private loadDepartmentById(id: string): void {
    const department = this.allDepartments().find((d) => d.id === id);
    if (department) {
      this.currentDepartment.set(department);
    } else {
      // Try to fetch from API
      this.departmentsService.getById(id).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.currentDepartment.set(response.data);
          } else if (this.allDepartments().length > 0) {
            this.router.navigate([
              '/department-details',
              this.allDepartments()[0].id,
            ]);
          }
        },
        error: () => {
          if (this.allDepartments().length > 0) {
            this.router.navigate([
              '/department-details',
              this.allDepartments()[0].id,
            ]);
          } else {
            this.router.navigate(['/']);
          }
        },
      });
    }
  }

  navigateToDepartment(department: Department): void {
    this.router.navigate(['/department-details', department.id]);
    this.currentDepartment.set(department);
  }

  navigateToPrevious(): void {
    const nav = this.navigation();
    if (nav.previous) {
      this.navigateToDepartment(nav.previous);
    }
  }

  navigateToNext(): void {
    const nav = this.navigation();
    if (nav.next) {
      this.navigateToDepartment(nav.next);
    }
  }

  getDepartmentTitle(department: Department | null): string {
    return department?.name || '';
  }

  getDepartmentViceDean(department: Department | null): string {
    return department?.subTitle || '';
  }

  getDepartmentGoals(department: Department | null): string[] {
    if (!department?.goals) return [];
    return department.goals.map((g) => g.goalName);
  }

  getDepartmentIcon(index: number): string {
    return this.departmentIcons[index % this.departmentIcons.length];
  }

  getDepartmentImage(department: Department | null): string {
    if (
      department?.departmentAttachments &&
      department.departmentAttachments.length > 0
    ) {
      return department.departmentAttachments[0].url;
    }
    return '';
  }

  getVision(department: Department | null): string {
    return department?.vision || '';
  }

  getMission(department: Department | null): string {
    return department?.mission || '';
  }

  getAbout(department: Department | null): string {
    return department?.about || '';
  }

  isCurrentDepartment(department: Department): boolean {
    return this.currentDepartment()?.id === department.id;
  }
}

import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  DepartmentsService,
  Department,
} from '../../../Services/real-services/departments/departments.service';

@Component({
  selector: 'app-all-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-department.component.html',
  styleUrls: ['./all-department.component.css'],
})
export class AllDepartmentsComponent implements OnInit {
  private readonly departmentsService = inject(DepartmentsService);
  private readonly router = inject(Router);

  // Signals for reactive state
  departments = signal<Department[]>([]);
  isLoading = signal<boolean>(true);

  // Default icons for departments
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
    this.isLoading.set(true);
    this.departmentsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.departments.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.isLoading.set(false);
      },
    });
  }

  navigateToDepartment(department: Department): void {
    this.router.navigate(['/department-details', department.id]);
  }

  getDepartmentIcon(index: number): string {
    return this.departmentIcons[index % this.departmentIcons.length];
  }

  getDepartmentOrder(index: number): string {
    return (index + 1).toString().padStart(2, '0');
  }

  getDepartmentDescription(department: Department): string {
    // Use about field or truncate mission/vision for description
    if (department.about) {
      const stripped = department.about.replace(/<[^>]*>/g, '');
      return stripped.length > 100
        ? stripped.substring(0, 100) + '...'
        : stripped;
    }
    return department.subTitle || '';
  }
}

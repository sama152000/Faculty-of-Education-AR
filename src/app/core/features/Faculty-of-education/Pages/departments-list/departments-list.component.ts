import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  DepartmentsService,
  Department,
} from '../../Services/real-services/departments/departments.service';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';

@Component({
  selector: 'app-departments-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
})
export class DepartmentsListComponent implements OnInit {
  private readonly departmentsService = inject(DepartmentsService);
  private readonly router = inject(Router);

  // Signals for reactive state
  departments = signal<Department[]>([]);
  isLoading = signal<boolean>(true);

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

  getDepartmentName(dept: Department): string {
    return dept.name || dept.pageTitle || '';
  }

  getDepartmentSubtitle(dept: Department): string {
    return dept.subTitle || '';
  }

  getDepartmentDescription(dept: Department): string {
    if (!dept.about) return '';
    const stripped = dept.about.replace(/<[^>]*>/g, '');
    return stripped.length > 150
      ? stripped.substring(0, 150) + '...'
      : stripped;
  }

  getDepartmentImage(dept: Department): string {
    if (dept.departmentAttachments && dept.departmentAttachments.length > 0) {
      const featured = dept.departmentAttachments.find((a) => a.isFeatured);
      return featured?.url || dept.departmentAttachments[0].url;
    }
    return 'assets/images/placeholder-department.jpg';
  }

  navigateToDetails(dept: Department): void {
    this.router.navigate(['/department-details', dept.id]);
  }
}

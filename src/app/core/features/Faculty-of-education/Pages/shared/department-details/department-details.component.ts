import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../Services/department.service';
import { Department, DepartmentNavigation } from '../../../model/department.model';
import { FooterComponent } from "../footer/footer.component";
import { PageHeaderComponent } from "../page-header/page-header.component";

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, RouterModule, FooterComponent, PageHeaderComponent],
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  currentDepartment: Department | null = null;
  allDepartments: Department[] = [];
  navigation: DepartmentNavigation | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    // Load list then subscribe to route params
    this.departmentService.getAllDepartments().subscribe(departments => {
      this.allDepartments = departments;

      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.loadDepartmentById(id);
        } else {
          // If no id provided, redirect to first department
          if (this.allDepartments.length > 0) {
            this.router.navigate(['/department-details', this.allDepartments[0].id]);
          }
        }
      });
    });
  }

  loadDepartmentById(id: string): void {
    this.loading = true;
    this.departmentService.getDepartmentById(id).subscribe(dept => {
      if (dept) {
        this.currentDepartment = dept;
        this.departmentService.getDepartmentNavigation(id).subscribe(nav => {
          this.navigation = nav;
          this.loading = false;
        });
      } else {
        // invalid id — redirect to first available
        if (this.allDepartments.length > 0) {
          this.router.navigate(['/department-details', this.allDepartments[0].id]);
        } else {
          this.router.navigate(['/']);
        }
        this.loading = false;
      }
    });
  }

  navigateToDepartment(department: Department): void {
    this.router.navigate(['/department-details', department.id]);
  }

  navigateToPrevious(): void {
    if (this.navigation && this.navigation.previous) {
      this.navigateToDepartment(this.navigation.previous);
    }
  }

  navigateToNext(): void {
    if (this.navigation && this.navigation.next) {
      this.navigateToDepartment(this.navigation.next);
    }
  }

  getDepartmentTitle(department: Department): string {
    return department.name;
  }

  getDepartmentViceDean(department: Department): string {
    return department.viceDean;
  }

  getDepartmentObjectives(department: Department): string[] {
    return department.objectives;
  }

  getDepartmentServices(department: Department): string[] {
    return department.services;
  }

  getDepartmentSubjects(department: Department): string[] {
    return department.subjects;
  }

  isCurrentDepartment(department: Department): boolean {
    return this.currentDepartment?.id === department.id;
  }
}
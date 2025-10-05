import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../Services/department.service';
import { Department } from '../../../model/department.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule,
FormsModule
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments();
  }

  navigateToDepartment(departmentId: string): void {
    this.router.navigate(['/department', departmentId]);
  }
}

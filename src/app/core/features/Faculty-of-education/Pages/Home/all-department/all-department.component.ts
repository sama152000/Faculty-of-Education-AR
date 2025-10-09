import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DepartmentService } from '../../../Services/department.service';
import { Department } from '../../../model/department.model';

@Component({
  selector: 'app-all-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-department.component.html',
  styleUrls: ['./all-department.component.css']
})
export class AllDepartmentsComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  navigateToDepartment(department: Department): void {
    this.router.navigate([department.route]);
  }
}
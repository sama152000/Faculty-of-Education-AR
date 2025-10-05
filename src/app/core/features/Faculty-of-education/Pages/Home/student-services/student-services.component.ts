import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDataService } from '../../../Services/faculty-data.service';
import { ServiceCategory } from '../../../model/services.model';

@Component({
  selector: 'app-student-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-services.component.html',
  styleUrls: ['./student-services.component.css']
})
export class StudentServicesComponent implements OnInit {
  serviceCategories: ServiceCategory[] = [];
  activeTab: string = 'prospective';

  constructor(private facultyDataService: FacultyDataService) {}

  ngOnInit(): void {
    this.serviceCategories = this.facultyDataService.getStudentServices();
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  getActiveCategory(): ServiceCategory | undefined {
    return this.serviceCategories.find(category => category.id === this.activeTab);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDataService } from '../../../Services/faculty-data.service';
import { StaffMember } from '../../../model/services.model';
import { FooterComponent } from "../../shared/footer/footer.component";
import { PageHeaderComponent } from "../../shared/page-header/page-header.component";

@Component({
  selector: 'app-staff-members',
  standalone: true,
  imports: [CommonModule, FooterComponent, PageHeaderComponent],
  templateUrl: './staff-members.component.html',
  styleUrls: ['./staff-members.component.css']
})
export class StaffMembersComponent implements OnInit {
  staffMembers: StaffMember[] = [];
  filteredStaff: StaffMember[] = [];
  departments: string[] = [];
  selectedDepartment: string = 'all';
  searchTerm: string = '';
  currentTab: string = '/about-us/staff-members';

  constructor(private facultyDataService: FacultyDataService) {}

  ngOnInit(): void {
    this.staffMembers = this.facultyDataService.getStaffMembers();
    this.filteredStaff = [...this.staffMembers];
    this.extractDepartments();
  }

  private extractDepartments(): void {
    const deptSet = new Set(this.staffMembers.map(member => member.department || 'General'));
    this.departments = Array.from(deptSet).sort();
  }

  filterByDepartment(department: string): void {
    this.selectedDepartment = department;
    this.applyFilters();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredStaff = this.staffMembers.filter(member => {
      const matchesDepartment = this.selectedDepartment === 'all' || 
                               (member.department || 'General') === this.selectedDepartment;
      const matchesSearch = member.name.toLowerCase().includes(this.searchTerm) ||
                           member.position.toLowerCase().includes(this.searchTerm);
      return matchesDepartment && matchesSearch;
    });
  }

  callPhone(phone: string): void {
    window.open(`tel:${phone}`, '_self');
  }

  getDepartmentColor(department: string): string {
    const colors = [
      'var(--primary-color)',  'var(--primary-color)',  'var(--primary-color)', 'var(--primary-color)',
       'var(--primary-color)',  'var(--primary-color)',  'var(--primary-color)',  'var(--primary-color)'
    ];
    const index = this.departments.indexOf(department) % colors.length;
    return colors[index];
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ')
      .filter(part => part.trim().length > 0)
      .map(part => part.trim()[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}

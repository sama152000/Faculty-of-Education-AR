import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../../Services/real-services/member.service';
import { Member } from '../../../model/member.model';

import { PageHeaderComponent } from '../../shared/page-header/page-header.component';

@Component({
  selector: 'app-staff-members',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './staff-members.component.html',
  styleUrls: ['./staff-members.component.css'],
})
export class StaffMembersComponent implements OnInit {
  private readonly memberService = inject(MemberService);

  // Signals for reactive state
  members = signal<Member[]>([]);
  isLoading = signal<boolean>(true);
  selectedDepartment = signal<string>('all');
  searchTerm = signal<string>('');

  // Computed signals
  departments = computed(() => {
    const deptSet = new Set<string>();
    this.members().forEach((member) => {
      if (member.specialization) {
        deptSet.add(member.specialization);
      }
    });
    return Array.from(deptSet).sort();
  });

  filteredStaff = computed(() => {
    const allMembers = this.members();
    const dept = this.selectedDepartment();
    const search = this.searchTerm().toLowerCase();

    return allMembers.filter((member) => {
      const matchesDepartment =
        dept === 'all' || (member.specialization || 'عام') === dept;
      const matchesSearch =
        !search ||
        member.fullName.toLowerCase().includes(search) ||
        member.position.toLowerCase().includes(search);
      return matchesDepartment && matchesSearch;
    });
  });

  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.isLoading.set(true);
    this.memberService.getAllMembers().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.members.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading members:', error);
        this.isLoading.set(false);
      },
    });
  }

  filterByDepartment(department: string): void {
    this.selectedDepartment.set(department);
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  getMemberImage(member: Member): string {
    if (member.memberAttachments && member.memberAttachments.length > 0) {
      return member.memberAttachments[0].url;
    }
    return '';
  }

  getDepartmentColor(department: string): string {
    const colors = [
      'var(--primary-color)',
      'var(--secondary-color)',
      '#667eea',
      '#764ba2',
      '#f093fb',
      '#f5576c',
      '#4facfe',
      '#00f2fe',
    ];
    const index = this.departments().indexOf(department) % colors.length;
    return colors[index >= 0 ? index : 0];
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .filter((part) => part.trim().length > 0)
      .map((part) => part.trim()[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  sendEmail(member: Member): void {
    // Placeholder - actual email should come from API
    window.location.href = `mailto:contact@faculty.edu`;
  }
}

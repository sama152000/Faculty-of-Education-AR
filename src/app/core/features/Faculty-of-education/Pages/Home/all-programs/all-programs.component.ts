import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UnifiedProgramsService } from '../../../Services/program.service';
import { Program } from '../../../model/program.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'all-programs',
  standalone: true,
  imports: [CommonModule, RouterModule

  ],
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.css']
})
export class AllProgramsComponent implements OnInit {
  programs: Program[] = [];
  filteredItems: Program[] = [];
  activeTab: 'all' | 'new' | 'old' = 'all';  // عدلت التبات لتناسب البرامج
  loading = false;

  constructor(private programsService: UnifiedProgramsService, public router: Router) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.loading = true;
    this.programsService.getAllPrograms().subscribe({
      next: (data) => {
        this.programs = data;
        this.filterItems();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterItems(): void {
    let filtered = this.programs;
    if (this.activeTab === 'new') {
      filtered = filtered.filter(p => p.isNew);
    } else if (this.activeTab === 'old') {
      filtered = filtered.filter(p => !p.isNew);
    }
    this.filteredItems = filtered.slice(0, 4);  // عرض 4 فقط في الهوم
  }

  switchTab(tab: 'all' | 'new' | 'old'): void {
    this.activeTab = tab;
    this.filterItems();
  }

  truncateText(text: string, limit: number): string {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  }

  navigateToPrograms(): void {
    this.router.navigate(['/programs']);
  }
}
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProgramsService } from '../../../Services/real-services/programs/programs.service';
import { Program } from '../../../model/program.model';

@Component({
  selector: 'all-programs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.css'],
})
export class AllProgramsComponent implements OnInit {
  private readonly programsService = inject(ProgramsService);
  private readonly router = inject(Router);

  // Signals for reactive state
  programs = signal<Program[]>([]);
  isLoading = signal<boolean>(true);

  // Computed signal for filtered items (limited to 4 for Home page)
  filteredItems = computed(() => {
    return this.programs().slice(0, 4);
  });

  ngOnInit(): void {
    this.loadPrograms();
  }

  private loadPrograms(): void {
    this.isLoading.set(true);
    this.programsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.programs.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading programs:', error);
        this.isLoading.set(false);
      },
    });
  }

  getProgramTitle(program: Program): string {
    return program.pageTitle || '';
  }

  getProgramDescription(program: Program): string {
    if (!program.about) return '';
    // Strip HTML and truncate
    const stripped = program.about.replace(/<[^>]*>/g, '');
    return stripped.length > 100
      ? stripped.substring(0, 100) + '...'
      : stripped;
  }

  getProgramImage(program: Program): string {
    if (program.programAttachments && program.programAttachments.length > 0) {
      return program.programAttachments[0].url;
    }
    return 'assets/images/placeholder-program.jpg';
  }

  truncateText(text: string, limit: number): string {
    if (!text) return '';
    const stripped = text.replace(/<[^>]*>/g, '');
    if (stripped.length <= limit) return stripped;
    return stripped.substring(0, limit) + '...';
  }

  navigateToPrograms(): void {
    this.router.navigate(['/programs']);
  }

  navigateToProgramDetails(program: Program): void {
    this.router.navigate(['/programs', program.id]);
  }
}

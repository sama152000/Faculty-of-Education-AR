import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgramsService } from '../../Services/real-services/programs/programs.service';
import { Program } from '../../model/program.model';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-programs-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PageHeaderComponent,
    InputTextModule,
    CardModule,
    ButtonModule,
    DividerModule,
    TagModule,
  ],
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css'],
})
export class ProgramsListComponent implements OnInit {
  private readonly programsService = inject(ProgramsService);

  // Signals for reactive state
  programs = signal<Program[]>([]);
  isLoading = signal<boolean>(true);
  searchTerm = signal<string>('');
  selectedProgram = signal<Program | null>(null);

  // Computed signal for filtered programs
  filteredPrograms = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.programs();
    return this.programs().filter(
      (p) =>
        p.pageTitle?.toLowerCase().includes(term) ||
        p.about?.toLowerCase().includes(term)
    );
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

  onSearch(): void {
    // Search is handled by the computed signal
  }

  getProgramTitle(program: Program): string {
    return program.pageTitle || '';
  }

  getProgramDescription(program: Program): string {
    if (!program.about) return '';
    const stripped = program.about.replace(/<[^>]*>/g, '');
    return stripped.length > 150
      ? stripped.substring(0, 150) + '...'
      : stripped;
  }

  getProgramImage(program: Program): string {
    if (program.programAttachments && program.programAttachments.length > 0) {
      return program.programAttachments[0].url;
    }
    return 'assets/images/placeholder-program.jpg';
  }

  selectProgram(program: Program): void {
    this.selectedProgram.set(program);
  }
}

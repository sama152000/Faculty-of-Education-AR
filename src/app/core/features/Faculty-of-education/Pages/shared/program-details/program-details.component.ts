import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Program } from '../../../model/program.model';
import { ProgramsService } from '../../../Services/real-services/programs/programs.service';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';

interface ProgramNavigation {
  previous: Program | null;
  next: Program | null;
}

@Component({
  selector: 'app-program-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    CardModule,
    ButtonModule,
    DividerModule,
    GalleriaModule,
    TagModule,
  ],
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly programsService = inject(ProgramsService);

  // Signals for reactive state
  currentProgram = signal<Program | null>(null);
  allPrograms = signal<Program[]>([]);
  loading = signal<boolean>(true);

  // Computed signal for navigation
  navigation = computed<ProgramNavigation>(() => {
    const current = this.currentProgram();
    const all = this.allPrograms();
    if (!current || all.length === 0) return { previous: null, next: null };

    const currentIndex = all.findIndex((p) => p.id === current.id);
    return {
      previous: currentIndex > 0 ? all[currentIndex - 1] : null,
      next: currentIndex < all.length - 1 ? all[currentIndex + 1] : null,
    };
  });

  // Computed signal for images
  images = computed(() => {
    const program = this.currentProgram();
    if (!program?.programAttachments) return [];
    return program.programAttachments.map((att) => ({
      source: att.url,
      alt: program.pageTitle || 'Program Image',
    }));
  });

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  ngOnInit(): void {
    this.loadPrograms();
  }

  private loadPrograms(): void {
    this.loading.set(true);
    this.programsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allPrograms.set(response.data);

          this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
              this.loadProgramById(id);
            } else if (response.data.length > 0) {
              this.router.navigate(['/programs', response.data[0].id]);
            }
          });
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading programs:', error);
        this.loading.set(false);
      },
    });
  }

  private loadProgramById(id: string): void {
    const program = this.allPrograms().find((p) => p.id === id);
    if (program) {
      this.currentProgram.set(program);
    } else {
      // Try to fetch from API
      this.programsService.getById(id).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.currentProgram.set(response.data);
          } else if (this.allPrograms().length > 0) {
            this.router.navigate(['/programs', this.allPrograms()[0].id]);
          }
        },
        error: () => {
          if (this.allPrograms().length > 0) {
            this.router.navigate(['/programs', this.allPrograms()[0].id]);
          } else {
            this.router.navigate(['/programs']);
          }
        },
      });
    }
  }

  navigateToProgram(program: Program): void {
    this.router.navigate(['/programs', program.id]);
    this.currentProgram.set(program);
  }

  goToNextProgram(): void {
    const nav = this.navigation();
    if (nav.next) {
      this.navigateToProgram(nav.next);
    }
  }

  goToPreviousProgram(): void {
    const nav = this.navigation();
    if (nav.previous) {
      this.navigateToProgram(nav.previous);
    }
  }

  getProgramTitle(program: Program | null): string {
    return program?.pageTitle || '';
  }

  getProgramAbout(program: Program | null): string {
    return program?.about || '';
  }

  getProgramVision(program: Program | null): string {
    return program?.vision || '';
  }

  getProgramMission(program: Program | null): string {
    return program?.mission || '';
  }

  getProgramGoals(program: Program | null): string[] {
    if (!program?.goals) return [];
    return program.goals.map((g) => g.goalName);
  }

  getProgramImage(program: Program | null): string {
    if (program?.programAttachments && program.programAttachments.length > 0) {
      return program.programAttachments[0].url;
    }
    return '';
  }

  isCurrentProgram(program: Program): boolean {
    return this.currentProgram()?.id === program.id;
  }
}

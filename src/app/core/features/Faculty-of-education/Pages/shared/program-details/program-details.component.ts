import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Program } from '../../../model/program-page.model';
import { ProgramsService } from '../../../Services/programs-page.service';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';

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
    TagModule
  ],
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {
  program: Program | undefined;
  allPrograms: Program[] = [];
  images: any[] = [];
  responsiveOptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programsService: ProgramsService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

  ngOnInit(): void {
    this.loadAllPrograms();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProgram(id);
    });
  }

  loadProgram(id: number): void {
    this.programsService.getProgramById(id).subscribe(data => {
      this.program = data;
      if (this.program) {
        this.images = this.program.images.map(img => ({ source: img, alt: this.program?.name }));
      }
    });
  }

  loadAllPrograms(): void {
    this.programsService.getAllPrograms().subscribe(data => {
      this.allPrograms = data;
    });
  }

  goToNextProgram(): void {
    if (this.program) {
      const nextProgram = this.programsService.getNextProgram(this.program.id);
      if (nextProgram) {
        this.router.navigate(['/programs', nextProgram.id]);
      }
    }
  }

  goToPreviousProgram(): void {
    if (this.program) {
      const previousProgram = this.programsService.getPreviousProgram(this.program.id);
      if (previousProgram) {
        this.router.navigate(['/programs', previousProgram.id]);
      }
    }
  }
}

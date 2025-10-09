import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Program } from '../../../model/program.model';
import { UnifiedProgramsService } from '../../../Services/program.service';  // صححت الاسم
import { PageHeaderComponent } from '../page-header/page-header.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-new-program-details',
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
    FooterComponent
],
  templateUrl: './new-program-details.component.html',
  styleUrls: ['./new-program-details.component.css']
})
export class NewProgramDetailsComponent implements OnInit {
  program: Program | undefined;
  allNewPrograms: Program[] = [];  // فلتر للجديدة فقط
  images: any[] = [];
  responsiveOptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programsService: UnifiedProgramsService
  ) {
    this.responsiveOptions = [
      // نفس الخيارات
    ];
  }

  ngOnInit(): void {
    this.loadAllNewPrograms();
    this.route.params.subscribe(params => {
      const id = params['id'];  // string
      this.loadProgram(id);
    });
  }

  loadProgram(id: string): void {
    this.programsService.getProgramById(id).subscribe(data => {
      this.program = data;
      if (this.program) {
        this.images = this.program.images.map(img => ({ source: img, alt: this.program?.name }));
      }
    });
  }

  loadAllNewPrograms(): void {
    this.programsService.getNewPrograms().subscribe(data => {  
      this.allNewPrograms = data;
    });
  }

  goToNextProgram(): void {
    if (this.program) {
      const nextProgram = this.programsService.getNextProgram(this.program.id);
      if (nextProgram && nextProgram.isNew) {  
        this.router.navigate(['/new-programs', nextProgram.id]);
      }
    }
  }

  goToPreviousProgram(): void {
    if (this.program) {
      const previousProgram = this.programsService.getPreviousProgram(this.program.id);
      if (previousProgram && previousProgram.isNew) {
        this.router.navigate(['/new-programs', previousProgram.id]);
      }
    }
  }
}
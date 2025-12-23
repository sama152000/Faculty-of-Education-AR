import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UnifiedProgramsService } from '../../Services/program.service'; // السيرفيس الموحد
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { FooterComponent } from '../shared/footer/footer.component'; // لأجل البادج

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
    TagModule, // أضفنا TagModule للبادج
    FooterComponent,
  ],
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css'],
})
export class ProgramsListComponent implements OnInit {
  programs: any[] = [];
  filteredPrograms: any[] = [];
  searchTerm: string = '';
  selectedProgram: any | null = null;

  constructor(private programsService: UnifiedProgramsService) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programsService.getAllPrograms().subscribe((data) => {
      this.programs = data;
      this.filteredPrograms = data;
    });
  }

  onSearch(): void {
    this.programsService.searchPrograms(this.searchTerm).subscribe((data) => {
      this.filteredPrograms = data;
    });
  }

  selectProgram(program: any): void {
    this.selectedProgram = program;
  }
}

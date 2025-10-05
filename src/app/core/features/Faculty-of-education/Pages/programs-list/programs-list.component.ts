import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Program } from '../../model/program-page.model';
import { ProgramsService } from '../../Services/programs-page.service';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

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
    DividerModule
  ],
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css']
})
export class ProgramsListComponent implements OnInit {
  programs: Program[] = [];
  filteredPrograms: Program[] = [];
  searchTerm: string = '';
  selectedProgram: Program | null = null;

  constructor(private programsService: ProgramsService) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programsService.getAllPrograms().subscribe(data => {
      this.programs = data;
      this.filteredPrograms = data;
    });
  }

  onSearch(): void {
    this.programsService.searchPrograms(this.searchTerm).subscribe(data => {
      this.filteredPrograms = data;
    });
  }

  selectProgram(program: Program): void {
    this.selectedProgram = program;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramService } from '../../../Services/program.service';
import { Program } from '../../../model/program.model';

@Component({
  selector: 'app-new-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-programs.component.html',
  styleUrls: ['./new-programs.component.css']
})
export class NewProgramsComponent implements OnInit {
  newPrograms: Program[] = [];

  constructor(private programService: ProgramService) {}

  ngOnInit(): void {
    this.newPrograms = this.programService.getNewPrograms();
  }
}

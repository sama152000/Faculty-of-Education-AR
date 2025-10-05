import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeanService } from '../../../Services/dean.service';
import { DeanInfo, FacultyHistory } from '../../../model/dean.model';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';

@Component({
  selector: 'app-dean-message',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './dean-message.component.html',
  styleUrls: ['./dean-message.component.css']
})
export class DeanMessageComponent implements OnInit {
  deanInfo!: DeanInfo;
  facultyHistory!: FacultyHistory;

  constructor(private deanService: DeanService) {}

  ngOnInit(): void {
    this.deanService.getDeanInfo().subscribe(info => {
      this.deanInfo = info;
    });

    this.deanService.getFacultyHistory().subscribe(history => {
      this.facultyHistory = history;
    });
  }

  formatMessage(message: string): string[] {
    return message.split('\n\n').filter(paragraph => paragraph.trim().length > 0);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeanService } from '../../../Services/dean.service';
import { DeanInfo, FacultyHistory } from '../../../model/dean.model';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-faculty-history',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, FooterComponent],
  templateUrl: './Faculty-History.component.html',
  styleUrls: ['./Faculty-History.component.css']
})
export class FacultyHistoryComponent implements OnInit {
  deanInfo!: DeanInfo;
  facultyHistory!: FacultyHistory;

  constructor(private deanService: DeanService) {}

  ngOnInit(): void {
   this.deanService.getFacultyHistory().subscribe(history => {
      this.facultyHistory = history;
    });

    
  }

  formatMessage(message: string): string[] {
    return message.split('\n\n').filter(paragraph => paragraph.trim().length > 0);
  }
}
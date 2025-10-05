import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalService } from '../../../Services/journal.service';
import { JournalInfo } from '../../../model/journal.model';

@Component({
  selector: 'app-faculty-journal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-journal.component.html',
  styleUrls: ['./faculty-journal.component.css']
})
export class FacultyJournalComponent implements OnInit {
  journalInfo!: JournalInfo;

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {
    this.journalInfo = this.journalService.getJournalInfo();
  }

  openJournal(): void {
    this.journalService.openJournal();
  }
 
  journalFeatures = [
    {
      icon: 'pi pi-verified',
      title: 'مراجعة من الأقران',
      description: 'عملية مراجعة أكاديمية صارمة'
    },
    {
      icon: 'pi pi-shield',
      title: 'النزاهة العلمية',
      description: 'أعلى معايير الأخلاقيات البحثية'
    },
    {
      icon: 'pi pi-graduation-cap',
      title: 'البحث التعليمي',
      description: 'تركيز على الابتكار التعليمي'
    },
    {
      icon: 'pi pi-star',
      title: 'التميز الأكاديمي',
      description: 'مساهمات علمية معترف بها'
    }
  ];

}
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  JournalsService,
  Journal,
} from '../../Services/real-services/journals.service';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';

@Component({
  selector: 'app-journals',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.css'],
})
export class JournalsComponent implements OnInit {
  private readonly journalsService = inject(JournalsService);

  journals = signal<Journal[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadJournals();
  }

  private loadJournals(): void {
    this.loading.set(true);
    this.journalsService.getAllJournals().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.journals.set(response.data);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading journals:', error);
        this.loading.set(false);
      },
    });
  }

  getJournalTitle(journal: Journal): string {
    return journal.title || '';
  }

  getJournalDescription(journal: Journal): string {
    return journal.description || '';
  }

  getJournalDate(journal: Journal): string {
    if (!journal.pubishedDate) return '';
    const date = new Date(journal.pubishedDate);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getJournalImage(journal: Journal): string {
    if (journal.journalAttachments && journal.journalAttachments.length > 0) {
      return journal.journalAttachments[0].url;
    }
    return '';
  }

  extractUrl(description: string): string | null {
    const urlMatch = description.match(/https?:\/\/[^\s]+/);
    return urlMatch ? urlMatch[0] : null;
  }

  openJournalLink(journal: Journal): void {
    const url = this.extractUrl(journal.description);
    if (url) {
      window.open(url, '_blank');
    }
  }

  hasExternalLink(journal: Journal): boolean {
    return !!this.extractUrl(journal.description);
  }

  getCleanDescription(journal: Journal): string {
    // Remove URL from description for display
    return journal.description.replace(/https?:\/\/[^\s]+/g, '').trim();
  }
}

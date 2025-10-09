import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NewsEventService } from '../../../Services/news-event.service';
import { NewsEvent, NewsEventFilter } from '../../../model/news-event.model';

@Component({
  selector: 'home-news-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-events.component.html',
  styleUrls: ['./news-events.component.css']
})
export class NewsEventsComponent implements OnInit {
  newsEvents: NewsEvent[] = [];
  filteredItems: NewsEvent[] = [];
  activeTab: 'all' | 'news' | 'event' = 'all';
  loading = false;

  constructor(private newsEventService: NewsEventService, private router: Router) {}

  ngOnInit(): void {
    this.loadNewsEvents();
  }

  loadNewsEvents(): void {
    this.loading = true;
    const filter: NewsEventFilter = {
      type: this.activeTab === 'all' ? undefined : this.activeTab
    };

    this.newsEventService.getNewsEvents(filter).subscribe({
      next: (response) => {
        this.newsEvents = response.items;
        this.filteredItems = response.items.slice(0, 4);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  switchTab(tab: 'all' | 'news' | 'event'): void {
    this.activeTab = tab;
    this.loadNewsEvents();
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getTypeLabel(type: string): string {
    return type === 'news' ? 'News' : 'Event';
  }

  getTypeIcon(type: string): string {
    return type === 'news' ? 'pi pi-info-circle' : 'pi pi-calendar';
  }

  truncateText(text: string, limit: number): string {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['news-events', id]);
  }

  navigateToNewsEvents(): void {
    this.router.navigate(['news-events']);
  }
}
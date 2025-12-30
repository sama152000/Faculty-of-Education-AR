import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NewsService } from '../../../Services/real-services/news.service';
import { News } from '../../../model/news.model';

@Component({
  selector: 'home-news-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-events.component.html',
  styleUrls: ['./news-events.component.css'],
})
export class NewsEventsComponent implements OnInit {
  private readonly newsService = inject(NewsService);
  private readonly router = inject(Router);

  // Signals for reactive state
  allNews = signal<News[]>([]);
  activeTab = signal<'all' | 'news' | 'event'>('all');
  isLoading = signal<boolean>(true);

  // Computed signal for filtered items (limited to 4 for Home page)
  filteredItems = computed(() => {
    const news = this.allNews();
    const tab = this.activeTab();

    let filtered = news;

    if (tab === 'news') {
      filtered = news.filter((item) =>
        item.postCategories?.some(
          (cat) =>
            cat.categoryName?.toLowerCase().includes('news') ||
            cat.categoryName?.toLowerCase().includes('خبر') ||
            cat.categoryName?.toLowerCase().includes('أخبار')
        )
      );
    } else if (tab === 'event') {
      filtered = news.filter((item) =>
        item.postCategories?.some(
          (cat) =>
            cat.categoryName?.toLowerCase().includes('event') ||
            cat.categoryName?.toLowerCase().includes('فعالية') ||
            cat.categoryName?.toLowerCase().includes('فعاليات')
        )
      );
    }

    return filtered.slice(0, 4);
  });

  ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(): void {
    this.isLoading.set(true);
    this.newsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allNews.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading news:', error);
        this.isLoading.set(false);
      },
    });
  }

  switchTab(tab: 'all' | 'news' | 'event'): void {
    this.activeTab.set(tab);
  }

  formatDate(dateInput: Date | string): string {
    if (!dateInput) return '';
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'news':
        return 'أخبار';
      case 'event':
        return 'فعاليات';
      default:
        return 'الكل';
    }
  }

  getTypeIcon(item: News): string {
    const hasEvent = item.postCategories?.some(
      (cat) =>
        cat.categoryName?.toLowerCase().includes('event') ||
        cat.categoryName?.toLowerCase().includes('فعالية')
    );
    return hasEvent ? 'pi pi-calendar' : 'pi pi-info-circle';
  }

  getTypeBadge(item: News): string {
    const hasEvent = item.postCategories?.some(
      (cat) =>
        cat.categoryName?.toLowerCase().includes('event') ||
        cat.categoryName?.toLowerCase().includes('فعالية')
    );
    return hasEvent ? 'event-badge' : 'news-badge';
  }

  getItemType(item: News): string {
    const hasEvent = item.postCategories?.some(
      (cat) =>
        cat.categoryName?.toLowerCase().includes('event') ||
        cat.categoryName?.toLowerCase().includes('فعالية')
    );
    return hasEvent ? 'فعالية' : 'خبر';
  }

  getItemImage(item: News): string {
    return item.featuredImagePath || 'assets/images/placeholder-news.jpg';
  }

  getItemCategory(item: News): string {
    return item.postCategories?.[0]?.categoryName || '';
  }

  getItemExcerpt(item: News): string {
    if (!item.content) return '';
    const stripped = item.content.replace(/<[^>]*>/g, '');
    return stripped.length > 120
      ? stripped.substring(0, 120) + '...'
      : stripped;
  }

  truncateText(text: string, limit: number): string {
    if (!text) return '';
    const stripped = text.replace(/<[^>]*>/g, '');
    if (stripped.length <= limit) return stripped;
    return stripped.substring(0, limit) + '...';
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['news-events', id]);
  }

  navigateToNewsEvents(): void {
    this.router.navigate(['news-events']);
  }
}

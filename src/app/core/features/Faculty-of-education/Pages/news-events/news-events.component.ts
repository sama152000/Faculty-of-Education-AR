import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../shared/footer/footer.component';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { NewsService } from '../../Services/real-services/news.service';
import { News, PostCategory, Category } from '../../model/news.model';

@Component({
  selector: 'app-news-events',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FooterComponent,
    PageHeaderComponent,
  ],
  templateUrl: './news-events.component.html',
  styleUrls: ['./news-events.component.css'],
})
export class NewsEventsComponent implements OnInit, OnDestroy {
  // Services
  private readonly newsService = inject(NewsService);
  private readonly route = inject(ActivatedRoute);

  // Signals for reactive state
  newsEvents = signal<News[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(false);

  // Tab state as signal
  activeTab = signal<'all' | 'news' | 'event'>('all');

  // Breadcrumbs
  breadcrumbs: Array<{ label: string; url?: string }> = [
    { label: 'الأخبار والفعاليات' },
  ];

  // Filter properties as signals
  dateFrom = signal<string>('');
  dateTo = signal<string>('');
  selectedCategory = signal<string>('');

  // Pagination
  currentPage = signal<number>(1);
  pageSize = 6;
  totalItems = signal<number>(0);

  // Computed signals
  totalPages = computed(() =>
    Math.ceil(this.filteredNewsEvents().length / this.pageSize)
  );

  filteredNewsEvents = computed(() => {
    let items = this.newsEvents();
    const tab = this.activeTab();
    const category = this.selectedCategory();
    const fromDate = this.dateFrom();
    const toDate = this.dateTo();

    // Filter by tab (category type)
    if (tab === 'news') {
      items = items.filter((item) =>
        item.postCategories.some(
          (cat) =>
            cat.categoryName?.toLowerCase().includes('أخبار') ||
            cat.categoryName?.toLowerCase().includes('خبر') ||
            cat.categoryName?.toLowerCase().includes('news')
        )
      );
    } else if (tab === 'event') {
      items = items.filter((item) =>
        item.postCategories.some(
          (cat) =>
            cat.categoryName?.toLowerCase().includes('فعالية') ||
            cat.categoryName?.toLowerCase().includes('فعاليات') ||
            cat.categoryName?.toLowerCase().includes('event')
        )
      );
    }

    // Filter by selected category
    if (category) {
      items = items.filter((item) =>
        item.postCategories.some((cat) => cat.categoryId === category)
      );
    }

    // Filter by date range
    if (fromDate) {
      const from = new Date(fromDate);
      items = items.filter((item) => new Date(item.createdDate) >= from);
    }

    if (toDate) {
      const to = new Date(toDate);
      items = items.filter((item) => new Date(item.createdDate) <= to);
    }

    return items;
  });

  paginatedNewsEvents = computed(() => {
    const filtered = this.filteredNewsEvents();
    const page = this.currentPage();
    const startIndex = (page - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  });

  private routeSubscription: Subscription | null = null;

  get headerActiveTabRoute(): string {
    return '/news-events/' + this.activeTab();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadNewsEvents();

    // Subscribe to route changes
    this.routeSubscription = this.route.url.subscribe((urlSegments) => {
      const last = urlSegments.length
        ? urlSegments[urlSegments.length - 1].path
        : '';
      if (last === 'news' || last === 'events') {
        this.activeTab.set(last === 'news' ? 'news' : 'event');
      } else {
        this.activeTab.set('all');
      }
      this.currentPage.set(1);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  loadCategories(): void {
    this.newsService.getCategories().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categories.set(response.data);
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  loadNewsEvents(): void {
    this.isLoading.set(true);
    this.newsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.newsEvents.set(response.data);
          this.totalItems.set(response.data.length);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading news events:', error);
        this.newsEvents.set([]);
        this.totalItems.set(0);
        this.isLoading.set(false);
      },
    });
  }

  onTabChange(tab: 'all' | 'news' | 'event'): void {
    this.activeTab.set(tab);
    this.currentPage.set(1);
  }

  applyFilter(): void {
    this.currentPage.set(1);
  }

  clearFilter(): void {
    this.dateFrom.set('');
    this.dateTo.set('');
    this.selectedCategory.set('');
    this.currentPage.set(1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  }

  getItemTitle(item: News): string {
    return item.title;
  }

  getItemExcerpt(item: News): string {
    // Return first 150 characters of content as excerpt
    const plainText = item.content.replace(/<[^>]*>/g, '');
    return plainText.length > 150
      ? plainText.substring(0, 150) + '...'
      : plainText;
  }

  getItemCategories(item: News): string {
    return item.postCategories
      .map((cat) => cat.categoryName)
      .filter(Boolean)
      .join(', ');
  }

  getItemImage(item: News): string {
    return (
      item.featuredImagePath ||
      (item.postAttachments.length > 0 ? item.postAttachments[0].url : '')
    );
  }

  getItemType(item: News): 'news' | 'event' {
    const hasEvent = item.postCategories.some(
      (cat) =>
        cat.categoryName?.toLowerCase().includes('فعالية') ||
        cat.categoryName?.toLowerCase().includes('فعاليات')
    );
    return hasEvent ? 'event' : 'news';
  }

  getTabLabel(tab: string): string {
    const labels: Record<string, string> = {
      all: 'الكل',
      news: 'الأخبار',
      event: 'الفعاليات',
    };
    return labels[tab] || tab;
  }

  getPaginationArray(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const total = this.totalPages();

    let startPage = Math.max(
      1,
      this.currentPage() - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(total, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}

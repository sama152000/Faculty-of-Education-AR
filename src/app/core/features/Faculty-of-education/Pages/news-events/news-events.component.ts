import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsEventService } from '../../Services/news-event.service';
import { NewsEvent, NewsEventFilter } from '../../model/news-event.model';
import { FooterComponent } from "../shared/footer/footer.component";
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FooterComponent, PageHeaderComponent],
  templateUrl: './news-events.component.html',
  styleUrls: ['./news-events.component.css']
})
export class NewsEventsComponent implements OnInit {
  newsEvents: NewsEvent[] = [];
  activeTab: 'all' | 'news' | 'event' = 'all';
  loading = false;
  
  // Filter properties
  filter: NewsEventFilter = {
    type: 'all'
  };
  
  dateFrom: string = '';
  dateTo: string = '';
  categories: string[] = [];
  selectedCategory: string = '';

  // Pagination
  currentPage = 1;
  pageSize = 6;
  totalItems = 0;
  totalPages = 0;

  private routeSubscription: Subscription | null = null;

  constructor(private newsEventService: NewsEventService, private route: ActivatedRoute) {}

  get headerActiveTabRoute(): string {
    return '/news-events/' + this.activeTab;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadNewsEvents();
    // Subscribe to route changes to keep header tabs in sync
    this.routeSubscription = this.route.url.subscribe(urlSegments => {
      const last = urlSegments.length ? urlSegments[urlSegments.length - 1].path : '';
      if (last === 'news' || last === 'events') {
        this.activeTab = last === 'news' ? 'news' : 'event';
      } else {
        this.activeTab = 'all';
      }
      // reload items for the selected tab
      this.currentPage = 1;
      this.loadNewsEvents();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  loadCategories(): void {
    this.newsEventService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadNewsEvents(): void {
    this.loading = true;

    // Prepare filter
    const filter: NewsEventFilter = {
      type: this.activeTab === 'all' ? undefined : this.activeTab,
      dateFrom: this.dateFrom ? new Date(this.dateFrom) : undefined,
      dateTo: this.dateTo ? new Date(this.dateTo) : undefined,
      category: this.selectedCategory || undefined
    };

    this.newsEventService.getNewsEvents(filter, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.newsEvents = response.items;
          this.totalItems = response.total;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading news events:', error);
          this.newsEvents = [];
          this.totalItems = 0;
          this.totalPages = 0;
          this.loading = false;
        }
      });
  }

  onTabChange(tab: 'all' | 'news' | 'event'): void {
    this.activeTab = tab;
    this.currentPage = 1;
    this.loadNewsEvents();
  }

  applyFilter(): void {
    this.currentPage = 1;
    this.loadNewsEvents();
  }

  clearFilter(): void {
    this.dateFrom = '';
    this.dateTo = '';
    this.selectedCategory = '';
    this.currentPage = 1;
    this.loadNewsEvents();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadNewsEvents();
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getItemTitle(item: NewsEvent): string {
    return item.title;
  }

  getItemExcerpt(item: NewsEvent): string {
    return item.excerpt;
  }

  getItemCategory(item: NewsEvent): string {
    return item.category || '';
  }

  getTabLabel(tab: string): string {
    const labels = {
      'all': 'All',
      'news': 'News',
      'event': 'Events'
    };
    return labels[tab as keyof typeof labels];
  }

  getPaginationArray(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
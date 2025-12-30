import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PageHeaderComponent } from '../page-header/page-header.component';
import { NewsService } from '../../../Services/real-services/news.service';
import { News, PostAttachment } from '../../../model/news.model';

@Component({
  selector: 'app-news-events-details',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './news-events-details.component.html',
  styleUrls: ['./news-events-details.component.css'],
})
export class NewsEventsDetailsComponent implements OnInit, OnDestroy {
  // Services
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly newsService = inject(NewsService);

  // Signals for reactive state
  currentItem = signal<News | null>(null);
  allNews = signal<News[]>([]);
  isLoading = signal<boolean>(true);
  currentImageIndex = signal<number>(0);

  // Computed signals
  relatedItems = computed(() => {
    const current = this.currentItem();
    const all = this.allNews();
    if (!current) return [];

    // Get items with same category
    const currentCategories = current.postCategories.map((c) => c.categoryId);
    return all
      .filter(
        (item) =>
          item.id !== current.id &&
          item.postCategories.some((cat) =>
            currentCategories.includes(cat.categoryId)
          )
      )
      .slice(0, 5);
  });

  nextItem = computed(() => {
    const current = this.currentItem();
    const all = this.allNews();
    if (!current) return null;

    const currentIndex = all.findIndex((item) => item.id === current.id);
    return currentIndex > 0 ? all[currentIndex - 1] : null;
  });

  previousItem = computed(() => {
    const current = this.currentItem();
    const all = this.allNews();
    if (!current) return null;

    const currentIndex = all.findIndex((item) => item.id === current.id);
    return currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  });

  images = computed(() => {
    const item = this.currentItem();
    if (!item) return [];

    const images: string[] = [];
    if (item.featuredImagePath) {
      images.push(item.featuredImagePath);
    }
    item.postAttachments.forEach((attachment) => {
      if (attachment.url && !images.includes(attachment.url)) {
        images.push(attachment.url);
      }
    });
    return images;
  });

  private routeSubscription: Subscription | null = null;

  ngOnInit(): void {
    // Load all news first
    this.loadAllNews();

    // Subscribe to route params
    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadItemDetails(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  loadAllNews(): void {
    this.newsService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.allNews.set(response.data);
        }
      },
      error: (error) => {
        console.error('Error loading all news:', error);
      },
    });
  }

  loadItemDetails(id: string): void {
    this.isLoading.set(true);
    this.currentImageIndex.set(0);

    this.newsService.getById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentItem.set(response.data);
        } else {
          this.router.navigate(['/news-events']);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading news details:', error);
        this.router.navigate(['/news-events']);
        this.isLoading.set(false);
      },
    });
  }

  navigateToItem(id: string): void {
    this.router.navigate(['/news-events', id]);
  }

  navigateToNext(): void {
    const next = this.nextItem();
    if (next) {
      this.navigateToItem(next.id);
    }
  }

  navigateToPrevious(): void {
    const prev = this.previousItem();
    if (prev) {
      this.navigateToItem(prev.id);
    }
  }

  nextImage(): void {
    const imgs = this.images();
    if (imgs.length > 1) {
      this.currentImageIndex.set((this.currentImageIndex() + 1) % imgs.length);
    }
  }

  previousImage(): void {
    const imgs = this.images();
    if (imgs.length > 1) {
      const current = this.currentImageIndex();
      this.currentImageIndex.set(current === 0 ? imgs.length - 1 : current - 1);
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex.set(index);
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(dateObj);
  }

  getItemTitle(item: News | null): string {
    return item?.title || '';
  }

  getItemContent(item: News | null): string {
    return item?.content || '';
  }

  getItemCategories(item: News | null): string {
    if (!item) return '';
    return item.postCategories
      .map((cat) => cat.categoryName)
      .filter(Boolean)
      .join(', ');
  }

  getItemImage(item: News | null): string {
    if (!item) return '';
    return (
      item.featuredImagePath ||
      (item.postAttachments.length > 0 ? item.postAttachments[0].url : '')
    );
  }

  getItemType(item: News | null): 'news' | 'event' {
    if (!item) return 'news';
    const hasEvent = item.postCategories.some(
      (cat) =>
        cat.categoryName?.toLowerCase().includes('فعالية') ||
        cat.categoryName?.toLowerCase().includes('فعاليات')
    );
    return hasEvent ? 'event' : 'news';
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.getItemTitle(this.currentItem()));
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`,
      '_blank'
    );
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.getItemTitle(this.currentItem()));
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      '_blank'
    );
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.getItemTitle(this.currentItem()));
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      '_blank'
    );
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      console.log('Link copied to clipboard');
    });
  }
}

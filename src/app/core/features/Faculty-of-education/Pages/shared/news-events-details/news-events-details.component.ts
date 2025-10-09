import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NewsEventService } from '../../../Services/news-event.service';
import { NewsEvent } from '../../../model/news-event.model';
import { FooterComponent } from "../footer/footer.component";
import { PageHeaderComponent } from "../page-header/page-header.component";

@Component({
  selector: 'app-news-events-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, PageHeaderComponent],
  templateUrl: './news-events-details.component.html',
  styleUrls: ['./news-events-details.component.css']
})
export class NewsEventsDetailsComponent implements OnInit {
  currentItem: NewsEvent | null = null;
  relatedItems: NewsEvent[] = [];
  nextItem: NewsEvent | null = null;
  previousItem: NewsEvent | null = null;
  currentImageIndex = 0;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsEventService: NewsEventService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadItemDetails(id);
      }
    });
  }

  loadItemDetails(id: string): void {
    this.loading = true;
    
    this.newsEventService.getNewsEventById(id).subscribe(item => {
      if (item) {
        this.currentItem = item;
        this.loadRelatedItems(item);
        this.loadNavigationItems(id);
      } else {
        this.router.navigate(['/news-events']);
      }
      this.loading = false;
    });
  }

  loadRelatedItems(item: NewsEvent): void {
    this.newsEventService.getRelatedItems(item.id, item.type, 5)
      .subscribe(items => {
        this.relatedItems = items;
      });
  }

  loadNavigationItems(id: string): void {
    this.newsEventService.getNextItem(id).subscribe(item => {
      this.nextItem = item;
    });
    
    this.newsEventService.getPreviousItem(id).subscribe(item => {
      this.previousItem = item;
    });
  }

  navigateToItem(id: string): void {
    this.router.navigate(['/news-events', id]);
  }

  navigateToNext(): void {
    if (this.nextItem) {
      this.navigateToItem(this.nextItem.id);
    }
  }

  navigateToPrevious(): void {
    if (this.previousItem) {
      this.navigateToItem(this.previousItem.id);
    }
  }

  nextImage(): void {
    if (this.currentItem && this.currentItem.images.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.currentItem.images.length;
    }
  }

  previousImage(): void {
    if (this.currentItem && this.currentItem.images.length > 1) {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? this.currentItem.images.length - 1 
        : this.currentImageIndex - 1;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  }

  getItemTitle(item: NewsEvent): string {
    return item.title;
  }

  getItemContent(item: NewsEvent): string {
    return item.content;
  }

  getItemCategory(item: NewsEvent): string {
    return item.category || '';
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.getItemTitle(this.currentItem!));
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.getItemTitle(this.currentItem!));
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.getItemTitle(this.currentItem!));
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      console.log('Link copied to clipboard');
    });
  }
}
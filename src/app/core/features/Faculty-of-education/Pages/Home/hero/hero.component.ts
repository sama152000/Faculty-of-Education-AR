import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  HeroSectionsService,
  HeroSection,
  HeroAttachment,
} from '../../../Services/real-services/hero-sections.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly heroSectionsService = inject(HeroSectionsService);

  // Signals for reactive state
  heroSections = signal<HeroSection[]>([]);
  currentSlideIndex = signal<number>(0);
  isLoading = signal<boolean>(true);
  isTransitioning = signal<boolean>(false);

  autoSlideInterval = 5000;
  private intervalId: any;

  // Computed signals
  slides = computed(() => {
    const sections = this.heroSections();
    if (!sections || sections.length === 0) return [];

    return sections.flatMap((section) =>
      section.heroAttachments.map((attachment) => ({
        image: attachment.url,
        title: section.title,
        description: section.subTitle || section.description,
        buttonText: 'اكتشف المزيد',
        buttonLink: '/about-us/vision-mission',
      }))
    );
  });

  currentSlide = computed(() => {
    const allSlides = this.slides();
    return allSlides[this.currentSlideIndex()] || null;
  });

  ngOnInit(): void {
    this.loadHeroSections();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  private loadHeroSections(): void {
    this.isLoading.set(true);
    this.heroSectionsService.getAllHeroSections().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Filter active sections
          const activeSections = response.data.filter(
            (section) => section.isActive
          );
          this.heroSections.set(
            activeSections.length > 0 ? activeSections : response.data
          );
        }
        this.isLoading.set(false);
        this.startAutoSlide();
      },
      error: (error) => {
        console.error('Error loading hero sections:', error);
        this.isLoading.set(false);
      },
    });
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideInterval);
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    if (this.isTransitioning()) return;

    this.isTransitioning.set(true);
    const slidesLength = this.slides().length;
    if (slidesLength > 0) {
      this.currentSlideIndex.set((this.currentSlideIndex() + 1) % slidesLength);
    }

    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 500);
  }

  prevSlide(): void {
    if (this.isTransitioning()) return;

    this.isTransitioning.set(true);
    const slidesLength = this.slides().length;
    if (slidesLength > 0) {
      const currentIndex = this.currentSlideIndex();
      this.currentSlideIndex.set(
        currentIndex === 0 ? slidesLength - 1 : currentIndex - 1
      );
    }

    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 500);
  }

  goToSlide(index: number): void {
    if (this.isTransitioning() || index === this.currentSlideIndex()) return;

    this.isTransitioning.set(true);
    this.currentSlideIndex.set(index);

    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 500);
  }

  getCurrentSlide(): any {
    return this.currentSlide();
  }

  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  onMouseLeave(): void {
    this.startAutoSlide();
  }
}

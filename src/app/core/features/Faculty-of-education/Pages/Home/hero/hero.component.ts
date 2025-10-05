import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroService } from '../../../Services/hero.service';
import { HeroSlide } from '../../../model/hero.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: HeroSlide[] = [];
  currentSlideIndex = 0;
  autoSlideInterval: number = 5000;
  intervalId: any;
  isTransitioning = false;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    const heroContent = this.heroService.getHeroContent();
    this.slides = heroContent.slides;
    this.autoSlideInterval = heroContent.autoSlideInterval;
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
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
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  prevSlide(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentSlideIndex = this.currentSlideIndex === 0 ? this.slides.length - 1 : this.currentSlideIndex - 1;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  goToSlide(index: number): void {
    if (this.isTransitioning || index === this.currentSlideIndex) return;
    
    this.isTransitioning = true;
    this.currentSlideIndex = index;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  getCurrentSlide(): HeroSlide | null {
    return this.slides[this.currentSlideIndex] || null;
  }

  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  onMouseLeave(): void {
    this.startAutoSlide();
  }
}
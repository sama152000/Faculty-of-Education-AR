import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  AboutService,
  About,
} from '../../../Services/real-services/about.service';

interface VisionMissionCard {
  title: string;
  content: string;
  icon: string;
  gradient: string;
}

@Component({
  selector: 'home-vision-mission',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css'],
})
export class VisionMissionComponent implements OnInit {
  private readonly aboutService = inject(AboutService);
  private readonly router = inject(Router);

  // Signals for reactive state
  aboutData = signal<About | null>(null);
  isLoading = signal<boolean>(true);

  // Computed signal for cards
  items = computed<VisionMissionCard[]>(() => {
    const data = this.aboutData();
    if (!data) return [];

    const cards: VisionMissionCard[] = [];

    if (data.vision) {
      cards.push({
        title: 'الرؤية',
        content: this.stripHtml(data.vision),
        icon: 'pi pi-eye',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      });
    }

    if (data.mission) {
      cards.push({
        title: 'الرسالة',
        content: this.stripHtml(data.mission),
        icon: 'pi pi-flag',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      });
    }

    if (data.goals && data.goals.length > 0) {
      cards.push({
        title: 'الأهداف',
        content: data.goals
          .slice(0, 3)
          .map((g) => g.goalName)
          .join(' • '),
        icon: 'pi pi-bullseye',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      });
    }

    return cards;
  });

  ngOnInit(): void {
    this.loadAboutData();
  }

  private loadAboutData(): void {
    this.isLoading.set(true);
    this.aboutService.getAboutUniversity().subscribe({
      next: (data) => {
        if (data) {
          this.aboutData.set(data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        this.isLoading.set(false);
      },
    });
  }

  navigateToVisionMission(): void {
    this.router.navigate(['/about-us/vision-mission']);
  }

  private stripHtml(html: string): string {
    const stripped = html.replace(/<[^>]*>/g, '');
    return stripped.length > 150
      ? stripped.substring(0, 150) + '...'
      : stripped;
  }
}

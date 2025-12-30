import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import {
  AboutService,
  About,
  Goal,
} from '../../../Services/real-services/about.service';

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, FooterComponent],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css'],
})
export class VisionMissionComponent implements OnInit {
  private readonly aboutService = inject(AboutService);

  // Signals for reactive state management
  aboutData = signal<About | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Icons for goals display
  goalIcons: string[] = [
    'pi pi-star',
    'pi pi-users',
    'pi pi-globe',
    'pi pi-chart-line',
    'pi pi-book',
    'pi pi-heart',
  ];

  ngOnInit(): void {
    this.loadAboutData();
  }

  private loadAboutData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.aboutService.getAboutUniversity().subscribe({
      next: (data) => {
        if (data) {
          this.aboutData.set(data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('حدث خطأ في تحميل البيانات');
        this.isLoading.set(false);
        console.error('Error loading about data:', err);
      },
    });
  }

  getGoalIcon(index: number): string {
    return this.goalIcons[index % this.goalIcons.length] ?? 'pi pi-star';
  }
}

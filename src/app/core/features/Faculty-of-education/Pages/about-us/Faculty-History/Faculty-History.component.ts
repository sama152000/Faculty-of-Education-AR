import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import {
  AboutService,
  About,
} from '../../../Services/real-services/about.service';

@Component({
  selector: 'app-faculty-history',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, FooterComponent],
  templateUrl: './Faculty-History.component.html',
  styleUrls: ['./Faculty-History.component.css'],
})
export class FacultyHistoryComponent implements OnInit {
  private readonly aboutService = inject(AboutService);

  // Signals for reactive state management
  aboutData = signal<About | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

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

  formatMessage(message: string | undefined): string[] {
    if (!message) return [];
    return message
      .split('\n\n')
      .filter((paragraph) => paragraph.trim().length > 0);
  }
}

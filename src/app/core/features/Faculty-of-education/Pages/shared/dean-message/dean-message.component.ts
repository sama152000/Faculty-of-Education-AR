import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';
import { FooterComponent } from '../footer/footer.component';
import { DeanSpeechsService } from '../../../Services/real-services/dean-speechs.service';
import { DeanSpeech } from '../../../model/dean.model';

@Component({
  selector: 'app-dean-message',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, FooterComponent],
  templateUrl: './dean-message.component.html',
  styleUrls: ['./dean-message.component.css'],
})
export class DeanMessageComponent implements OnInit {
  private readonly deanSpeechsService = inject(DeanSpeechsService);

  // Signals for reactive state management
  deanSpeech = signal<DeanSpeech | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadDeanSpeech();
  }

  private loadDeanSpeech(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.deanSpeechsService.getAll().subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          // Get the first dean speech
          this.deanSpeech.set(response.data[0]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('حدث خطأ في تحميل البيانات');
        this.isLoading.set(false);
        console.error('Error loading dean speech:', err);
      },
    });
  }

  formatMessage(message: string | undefined): string[] {
    if (!message) return [];
    return message
      .split('\n\n')
      .filter((paragraph) => paragraph.trim().length > 0);
  }

  getDeanPhoto(): string {
    const speech = this.deanSpeech();
    if (
      speech?.deanSpeechAttachments &&
      speech.deanSpeechAttachments.length > 0
    ) {
      return speech.deanSpeechAttachments[0].url;
    }
    return 'assets/images/default-dean.jpg';
  }
}

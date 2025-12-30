import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  StatisticsService,
  Statistic,
} from '../../../Services/real-services/statistics.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  private readonly statisticsService = inject(StatisticsService);

  // Signals for reactive state
  statistics = signal<Statistic[]>([]);
  isLoading = signal<boolean>(true);

  // Computed signals
  activeStatistics = computed(() => {
    return this.statistics().filter((stat) => stat.isActive);
  });

  totalValue = computed(() => {
    return this.activeStatistics().reduce((sum, stat) => {
      const value = parseInt(stat.value, 10);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  });

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.isLoading.set(true);
    this.statisticsService.getAllStatistics().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.statistics.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
        this.isLoading.set(false);
      },
    });
  }

  getStatIcon(stat: Statistic): string {
    return stat.iconPath || 'pi pi-chart-bar';
  }

  formatValue(value: string): string {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return value;
    return numValue.toLocaleString('ar-EG');
  }
}

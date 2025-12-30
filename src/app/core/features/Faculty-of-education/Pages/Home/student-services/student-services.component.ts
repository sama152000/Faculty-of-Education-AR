import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FacultyServicesService,
  FacultyService,
} from '../../../Services/real-services/services.service';

@Component({
  selector: 'app-student-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-services.component.html',
  styleUrls: ['./student-services.component.css'],
})
export class StudentServicesComponent implements OnInit {
  private readonly servicesService = inject(FacultyServicesService);

  // Signals for reactive state
  services = signal<FacultyService[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.isLoading.set(true);
    this.servicesService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.services.set(response.data.filter((s) => s.isActive));
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.isLoading.set(false);
      },
    });
  }

  getServiceIcon(service: FacultyService): string {
    return service.iconPath || 'pi pi-check-circle';
  }

  getServiceDescription(service: FacultyService): string {
    if (!service.description) return '';
    const stripped = service.description.replace(/<[^>]*>/g, '');
    return stripped.length > 100
      ? stripped.substring(0, 100) + '...'
      : stripped;
  }
}

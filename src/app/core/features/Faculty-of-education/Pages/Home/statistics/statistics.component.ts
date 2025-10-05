import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyDataService } from '../../../Services/faculty-data.service';
import { StatisticTab } from '../..//../model/services.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statisticTabs: StatisticTab[] = [];
  activeTab: string = 'enrolled-students';

  constructor(private facultyDataService: FacultyDataService) {}

  ngOnInit(): void {
    this.statisticTabs = this.facultyDataService.getStatistics();
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  getActiveTab(): StatisticTab | undefined {
    return this.statisticTabs.find(tab => tab.id === this.activeTab);
  }

  getTotalStudents(data: any[]): number {
    return data.reduce((total, item) => total + item.value, 0);
  }
}
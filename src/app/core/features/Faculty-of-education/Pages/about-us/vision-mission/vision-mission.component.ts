import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisionMissionService } from '../../../Services/vision-mission.service';
import { VisionMission, ObjectiveItem } from '../../../model/vision-mission.model';
import { PageHeaderComponent } from '../../shared/page-header/page-header.component';

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css']
})
export class VisionMissionComponent implements OnInit {
  visionMission!: VisionMission;
  objectiveItems: ObjectiveItem[] = [];

  constructor(private visionMissionService: VisionMissionService) {}

  ngOnInit(): void {
    this.visionMissionService.getVisionMission().subscribe(data => {
      this.visionMission = data;
    });

    this.visionMissionService.getObjectiveItems().subscribe(items => {
      this.objectiveItems = items;
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisionMissionService } from '../../../Services/vision-mission.service';
import { VisionMissionItem } from '../../../model/vision-mission.model';

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css']
})
export class VisionMissionComponent implements OnInit {
  items: VisionMissionItem[] = [];

  constructor(private visionMissionService: VisionMissionService) {}

  ngOnInit(): void {
    this.items = this.visionMissionService.getVisionMissionItems();
  }
}
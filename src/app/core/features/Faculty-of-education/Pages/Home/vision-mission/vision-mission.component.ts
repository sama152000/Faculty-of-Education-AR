import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VisionMissionService } from '../../../Services/vision-mission.service';
import { VisionMissionItem } from '../../../model/vision-mission.model';

@Component({
  selector: 'home-vision-mission',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.css']
})
export class VisionMissionComponent implements OnInit {
  items: VisionMissionItem[] = [];

  constructor(private visionMissionService: VisionMissionService, private router: Router) {}

  ngOnInit(): void {
    this.items = this.visionMissionService.getVisionMissionItems();
  }

  navigateToVisionMission(): void {
    this.router.navigate(['/about-us/vision-mission']);
  }
}

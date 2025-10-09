import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { VisionMissionComponent } from "./vision-mission/vision-mission.component";
import { FacultyJournalComponent } from "./faculty-journal/faculty-journal.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { StudentServicesComponent } from "./student-services/student-services.component";
import { NewsEventsComponent } from '../Home/news-events/news-events.component';
import { AllDepartmentsComponent } from "./all-department/all-department.component";
import { AllProgramsComponent } from "./all-programs/all-programs.component";

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [HeroComponent,
    FooterComponent,
    VisionMissionComponent,
    FacultyJournalComponent,
    StatisticsComponent,
    StudentServicesComponent,
    NewsEventsComponent,
    AllDepartmentsComponent, AllProgramsComponent]
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

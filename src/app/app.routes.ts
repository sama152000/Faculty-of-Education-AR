import { Routes } from '@angular/router';
import { FacultyOfEducationComponent } from './core/features/Faculty-of-education/Faculty-of-education.component';
import { HomeComponent } from './core/features/Faculty-of-education/Pages/Home/Home.component';
import { NewsEventsComponent } from './core/features/Faculty-of-education/Pages/news-events/news-events.component';
import { StaffMembersComponent } from './core/features/Faculty-of-education/Pages/about-us/staff-members/staff-members.component';
import { NewsEventsDetailsComponent } from './core/features/Faculty-of-education/Pages/shared/news-events-details/news-events-details.component';
import { ProgramsListComponent } from './core/features/Faculty-of-education/Pages/programs-list/programs-list.component';
import { ProgramDetailsComponent } from './core/features/Faculty-of-education/Pages/shared/program-details/program-details.component';
import { ContactUsComponent } from './core/features/Faculty-of-education/Pages/contact-us/contact-us.component';
import { DeanMessageComponent } from './core/features/Faculty-of-education/Pages/shared/dean-message/dean-message.component';
import { VisionMissionComponent } from './core/features/Faculty-of-education/Pages/about-us/vision-mission/vision-mission.component';
import { SectorsComponent } from './core/features/Faculty-of-education/Pages/sectors/sectors.component';
import { DepartmentsComponent } from './core/features/Faculty-of-education/Pages/Home/departments/departments.component';

export const routes: Routes = [

 {
    path: '',
    component: FacultyOfEducationComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {path:'about-us/staff-members', component : StaffMembersComponent},
      { path: 'news-events', component: NewsEventsComponent },
      {path :'news-events/:id', component : NewsEventsDetailsComponent},
        { path: 'programs', component: ProgramsListComponent },
  { path: 'programs/:id', component: ProgramDetailsComponent },
    { path: 'contact', component: ContactUsComponent },
    { path: 'about-us/dean-word', component: DeanMessageComponent },
    { path: 'about-us/vision-mission', component: VisionMissionComponent },

    { path: 'units', component: HomeComponent },
    { path: 'labs/computer', component: HomeComponent },
    { path: 'labs/mental-health', component: HomeComponent },
    { path: 'labs/micro-teaching', component: HomeComponent },
    { path: 'labs/science', component: HomeComponent },
    { path: 'programs/new/mathematics-english', component: HomeComponent },
    { path: 'programs/new/biology-english', component: HomeComponent },
    { path: 'programs/new/physics-english', component: HomeComponent },
    { path: 'programs/new/chemistry-english', component: HomeComponent },
    { path: 'programs/academic/arabic', component: HomeComponent },
    { path: 'programs/academic/english', component: HomeComponent },
    { path: 'programs/academic/french', component: HomeComponent },
    { path: 'programs/academic/german', component: HomeComponent },
    { path: 'programs/academic/mathematics', component: HomeComponent },
    { path: 'programs/academic/chemistry', component: HomeComponent },
    { path: 'programs/academic/biology', component: HomeComponent },
    { path: 'administrations/student-affairs', component: HomeComponent },
    { path: 'administrations/postgraduate', component: HomeComponent },
    { path: 'administrations/hr', component: HomeComponent },
    { path: 'administrations/youth-welfare', component: HomeComponent },
    { path: 'administrations/labs', component: HomeComponent },
    { path: 'administrations/stores', component: HomeComponent },
  // Departments list page
  { path: 'department', component: DepartmentsComponent },
  { path: 'management/dean', component: HomeComponent },
  { path: 'management/vice-dean-education', component: SectorsComponent },
  { path: 'management/vice-dean-education/:id', component: SectorsComponent },
  { path: 'management/vice-dean-postgraduate', component: SectorsComponent },
  { path: 'management/vice-dean-postgraduate/:id', component: SectorsComponent },
  { path: 'management/vice-dean-community', component: SectorsComponent },
  { path: 'management/vice-dean-community/:id', component: SectorsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }

];

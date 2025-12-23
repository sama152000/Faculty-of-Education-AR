import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-education/Faculty-of-education.component'
      ).then((c) => c.FacultyOfEducationComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'about-us/staff-members',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/about-us/staff-members/staff-members.component'
          ).then((c) => c.StaffMembersComponent),
      },
      {
        path: 'news-events',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/news-events/news-events.component'
          ).then((c) => c.NewsEventsComponent),
      },
      {
        path: 'news-events/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/news-events-details/news-events-details.component'
          ).then((c) => c.NewsEventsDetailsComponent),
      },
      {
        path: 'comming-soon',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/coming-soon/coming-soon.component'
          ).then((c) => c.ComingSoonComponent),
      },
      {
        path: 'programs',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/programs-list/programs-list.component'
          ).then((c) => c.ProgramsListComponent),
      },
      {
        path: 'programs/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/program-details/program-details.component'
          ).then((c) => c.ProgramDetailsComponent),
      },
      {
        path: 'new-programs',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/programs-list/programs-list.component'
          ).then((c) => c.ProgramsListComponent),
      },
      {
        path: 'new-programs/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/new-program-details/new-program-details.component'
          ).then((c) => c.NewProgramDetailsComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/contact-us/contact-us.component'
          ).then((c) => c.ContactUsComponent),
      },
      {
        path: 'about-us/dean-word',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/dean-message/dean-message.component'
          ).then((c) => c.DeanMessageComponent),
      },
      {
        path: 'about-us/vision-mission',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/about-us/vision-mission/vision-mission.component'
          ).then((c) => c.VisionMissionComponent),
      },
      {
        path: 'about-us/Faculty-history',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/about-us/Faculty-History/Faculty-History.component'
          ).then((c) => c.FacultyHistoryComponent),
      },
      // Placeholder routes - using HomeComponent as fallback
      {
        path: 'units',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'labs/computer',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'labs/mental-health',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'labs/micro-teaching',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'labs/science',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/new/mathematics-english',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/new/biology-english',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/new/physics-english',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/new/chemistry-english',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/arabic',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/arabic/id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/english',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/french',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/german',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/mathematics',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/chemistry',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'programs/academic/biology',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'administrations/student-affairs',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'administrations/postgraduate',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'administrations/hr',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'administrations/youth-welfare',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'administrations/labs',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'administrations/stores',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      // Department routes
      {
        path: 'department-details',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },
      {
        path: 'department-details/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/department-details/department-details.component'
          ).then((c) => c.DepartmentDetailsComponent),
      },
      // Management routes
      {
        path: 'management/vice-dean-education',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((c) => c.SectorsComponent),
      },
      {
        path: 'management/vice-dean-education/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((c) => c.SectorsComponent),
      },
      {
        path: 'management/vice-dean-postgraduate',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((c) => c.SectorsComponent),
      },
      {
        path: 'management/vice-dean-postgraduate/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((m) => m.SectorsComponent),
      },
      {
        path: 'management/vice-dean-community',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((m) => m.SectorsComponent),
      },
      {
        path: 'management/vice-dean-community/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((m) => m.SectorsComponent),
      },
      // Default redirect
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

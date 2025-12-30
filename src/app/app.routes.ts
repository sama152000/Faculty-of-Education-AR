import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './core/features/Faculty-of-education/Faculty-of-education.component'
      ).then((c) => c.FacultyOfEducationComponent),
    children: [
      // === MAIN ROUTES ===
      {
        path: 'home',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/Home/Home.component'
          ).then((c) => c.HomeComponent),
      },

      // === NEWS & EVENTS ===
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

      // === JOURNALS ===
      {
        path: 'journals',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/journals/journals.component'
          ).then((c) => c.JournalsComponent),
      },

      // === PROGRAMS ===
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

      // === SECTORS ===
      {
        path: 'sectors',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((c) => c.SectorsComponent),
      },
      {
        path: 'sectors/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/sectors/sectors.component'
          ).then((c) => c.SectorsComponent),
      },

      // === CENTERS & UNITS ===
      {
        path: 'centers-units',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/centers-units/centers-units.component'
          ).then((c) => c.CentersUnitsComponent),
      },
      {
        path: 'centers-units/:type/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/centers-units/centers-units.component'
          ).then((c) => c.CentersUnitsComponent),
      },

      // === DEPARTMENTS ===
      {
        path: 'departments',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/departments-list/departments-list.component'
          ).then((c) => c.DepartmentsListComponent),
      },
      {
        path: 'department-details/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/department-details/department-details.component'
          ).then((c) => c.DepartmentDetailsComponent),
      },

      // === MANAGEMENTS ===
      {
        path: 'managements',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/management-details/management-details.component'
          ).then((c) => c.ManagementDetailsComponent),
      },
      {
        path: 'managements/:id',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/management-details/management-details.component'
          ).then((c) => c.ManagementDetailsComponent),
      },

      // === ABOUT US ===
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
      {
        path: 'about-us/staff-members',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/about-us/staff-members/staff-members.component'
          ).then((c) => c.StaffMembersComponent),
      },

      // === CONTACT ===
      {
        path: 'contact',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/contact-us/contact-us.component'
          ).then((c) => c.ContactUsComponent),
      },

      // === COMING SOON (for unfinished pages) ===
      {
        path: 'comming-soon',
        loadComponent: () =>
          import(
            './core/features/Faculty-of-education/Pages/shared/coming-soon/coming-soon.component'
          ).then((c) => c.ComingSoonComponent),
      },

      // === DEFAULT REDIRECT ===
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      // === WILDCARD - Redirect unknown routes to home ===
      { path: '**', redirectTo: 'home' },
    ],
  },
];

import { Injectable } from '@angular/core';
import { NavItem, SocialLink, ContactInfo } from '../model/navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private mainNavItems: NavItem[] = [
    {
      id: 'home',
      label: 'الصفحة الرئيسية',
      route: '/home',
    },
    {
      id: 'About Us',
      label: 'عن الكلية',
      children: [
        {
          id: 'dean-word',
          label: 'كلمة العميد',
          route: '/about-us/dean-word',
        },
        {
          id: 'Faculty-history',
          label: 'تاريخ الكلية',
          route: '/about-us/Faculty-history',
        },
        {
          id: 'vision-mission',
          label: 'الرؤية والرسالة والأهداف',
          route: '/about-us/vision-mission',
        },
        {
          id: 'staff-members',
          label: 'أعضاء هيئة التدريس',
          route: '/about-us/staff-members',
        },
      ],
    },
    {
      id: 'news-events',
      label: 'الأخبار والفعاليات',
      route: '/news-events',
    },
    {
      id: 'journals',
      label: 'المجلات العلمية',
      route: '/journals',
    },
    {
      id: 'centers-units',
      label: 'المراكز والوحدات',
      route: '/centers-units',
    },
    {
      id: 'programs',
      label: 'البرامج الدراسية',
      route: '/programs',
    },
    {
      id: 'faculty-administrations',
      label: 'الإدارات بالكلية',
      route: '/managements',
    },
    {
      id: 'faculty-departments',
      label: 'أقسام الكلية',
      route: '/departments',
    },
    {
      id: 'Sectors',
      label: 'القطاعات',
      route: '/sectors',
    },
    {
      id: 'contact',
      label: 'تواصلوا معنا',
      route: '/contact',
    },
  ];

  private socialLinks: SocialLink[] = [
    {
      platform: 'فيسبوك',
      url: 'https://facebook.com/luxoreducation',
      icon: 'pi pi-facebook',
      color: '#1877f2',
    },
    {
      platform: 'يوتيوب',
      url: 'https://youtube.com/luxoruniversity',
      icon: 'pi pi-youtube',
      color: '#ff0000',
    },
    {
      platform: 'لينكدإن',
      url: 'https://linkedin.com/company/luxor-university',
      icon: 'pi pi-linkedin',
      color: '#0077b5',
    },
  ];

  private contactInfo: ContactInfo = {
    address:
      'كلية التربية - جامعة الأقصر - مدينة طيبة الجديدة، بجوار هيئة مدينة طيبة الجديدة',
    phone: '01010577677',
    emails: {
      dean: 'waleed2507@yahoo.co.uk',
      journal: 'Lueduscij@fedu.luxor.edu.eg',
    },
  };

  private footerQuickLinks = [
    {
      label: 'موقع جامعة الأقصر',
      url: 'http://www.luxor.edu.eg/#/',
      external: true,
    },
    {
      label: 'الصفحة الرسمية على فيسبوك',
      url: 'https://facebook.com/luxoreducation',
      external: true,
    },
    {
      label: 'مجلة العلوم التربوية',
      url: 'https://jedul.journals.ekb.eg/',
      external: true,
    },
    {
      label: 'بوابة 90',
      url: '#',
      external: true,
    },
  ];

  getMainNavItems(): NavItem[] {
    return this.mainNavItems;
  }

  getSocialLinks(): SocialLink[] {
    return this.socialLinks;
  }

  getContactInfo(): ContactInfo {
    return this.contactInfo;
  }

  getFooterQuickLinks() {
    return this.footerQuickLinks;
  }

  getFooterNavItems(): NavItem[] {
    return [
      {
        id: 'about-faculty',
        label: 'عن الكلية',
        route: '/about-us/Faculty-history',
      },
      {
        id: 'top-management-footer',
        label: 'كلمة العميد',
        route: '/about-us/dean-word',
      },
      {
        id: 'faculty-departments-footer',
        label: 'أقسام الكلية',
        route: '/departments',
      },
      {
        id: 'faculty-administrations-footer',
        label: 'الإدارات بالكلية',
        route: '/comming-soon',
      },
      {
        id: 'programs-footer',
        label: 'البرامج الدراسية',
        route: '/programs',
      },
      {
        id: 'units-labs-footer',
        label: 'الوحدات والمعامل',
        route: '/comming-soon',
      },
      {
        id: 'news-events-footer',
        label: 'الأخبار والفعاليات',
        route: '/news-events',
      },
      {
        id: 'contact-footer',
        label: 'تواصلوا معنا',
        route: '/contact',
      },
    ];
  }
}

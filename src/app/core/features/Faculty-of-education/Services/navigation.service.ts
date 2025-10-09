import { Injectable } from '@angular/core';
import { NavItem, SocialLink, ContactInfo } from '../model/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private mainNavItems: NavItem[] = [
    {
      id: 'home',
      label: 'الصفحة الرئيسية',
      route: '/home'
    },
    {
      id: 'About Us',
      label: 'عن الكلية',
      children: [
        {
          id: 'dean-word',
          label: 'كلمة العميد',
          route: '/about-us/dean-word'
        },
        {
          id: 'Faculty-history',
          label: 'تاريخ الكلية',
          route: '/about-us/Faculty-history'
        },
        {
          id: 'vision-mission',
          label: 'الرؤية والرسالة والأهداف',
          route: '/about-us/vision-mission'
        },
        {
          id: 'staff-members',
          label: 'أعضاء هيئة التدريس',
          route: '/about-us/staff-members'
        }
      ]
    },
    {
      id: 'news-events',
      label: 'الأخبار والفعاليات',
      route: '/news-events'
    },
    {
      id: 'units-labs',
      label: 'الوحدات والمعامل',
      children: [
        {
          id: 'laboratories',
          label: 'المعامل',
          children: [
            {
              id: 'computer-lab',
              label: 'معمل الحاسب الآلي',
              route: '/labs/computer'
            },
            {
              id: 'mental-health-lab',
              label: 'معمل الصحة النفسية',
              route: '/labs/mental-health'
            },
            {
              id: 'micro-teaching-lab',
              label: 'معمل التدريس المصغر',
              route: '/labs/micro-teaching'
            },
            {
              id: 'science-lab',
              label: 'معمل العلوم',
              route: '/labs/science'
            }
          ]
        },
        {
          id: 'units',
          label: 'الوحدات',
          route: '/units'
        }
      ]
    },
    {
      id: 'programs',
      label: 'البرامج الدراسية',
      children: [
        {
          id: 'academic-programs',
          label: 'البرامج الأكاديمية',
          children: [
            {
              id: 'arabic',
              label: 'إعداد معلمي اللغة العربية ',
              route: '/programs/arabic'
            },
            {
              id: 'english',
              label: 'إعداد معلمي اللغة الإنجليزية ',
              route: '/programs/english'
            },
            {
              id: 'french',
              label: 'إعداد معلمي اللغة الفرنسية ',
              route: '/programs/french'
            },
            {
              id: 'german',
              label: 'إعداد معلمي اللغة الألمانية ',
              route: '/programs/german'
            },
            {
              id: 'math',
              label: 'إعداد معلمي الرياضيات',
              route: '/programs/math'
            },
            {
              id: 'chemistry',
              label: 'إعداد معلمي الكيمياء',
              route: '/programs/chemistry'
            },
            {
              id: 'biology',
              label: 'إعداد معلمي العلوم البيولوجية',
              route: '/programs/biology'
            }
          ]
        },
        {
          id: 'new-programs',
          label: 'البرامج الجديدة',
          children: [
            {
              id: 'math-english',
              label: 'إعداد معلمي الرياضيات (باللغة الإنجليزية)',
              route: '/new-programs/math-english'
            },
            {
              id: 'biology-english',
              label: 'إعداد معلمي العلوم البيولوجية (باللغة الإنجليزية)',
              route: '/new-programs/biology-english'
            },
            {
              id: 'physics-english',
              label: 'إعداد معلمي الفيزياء (باللغة الإنجليزية)',
              route: '/new-programs/physics-english'
            },
            {
              id: 'chemistry-english',
              label: 'إعداد معلمي الكيمياء (باللغة الإنجليزية)',
              route: '/new-programs/chemistry-english'
            }
          ]
        }
      ]
    },
    {
      id: 'faculty-administrations',
      label: 'الإدارات الإدارية بالكلية',
      children: [
        {
          id: 'student-affairs',
          label: 'إدارة شؤون الطلاب',
          route: '/administrations/student-affairs'
        },
        {
          id: 'postgraduate',
          label: 'إدارة الدراسات العليا',
          route: '/administrations/postgraduate'
        },
        {
          id: 'hr',
          label: 'إدارة الموارد البشرية',
          route: '/administrations/hr'
        },
        {
          id: 'youth-welfare',
          label: 'إدارة رعاية الشباب',
          route: '/administrations/youth-welfare'
        },
        {
          id: 'labs-admin',
          label: 'إدارة المعامل',
          route: '/administrations/labs'
        },
        {
          id: 'stores',
          label: 'إدارة المخازن',
          route: '/administrations/stores'
        }
      ]
    },
    {
      id: 'faculty-departments',
      label: 'أقسام الكلية',
      route: '',
      children: [
        {
          id: 'curricula-teaching',
          label: 'المناهج وطرق التدريس',
          route: '/department-details/curricula-teaching'
        },
        {
          id: 'foundations-education',
          label: 'أصول التربية',
          route: '/department-details/foundations-education'
        },
        {
          id: 'mental-health',
          label: 'الصحة النفسية',
          route: '/department-details/mental-health'
        },
        {
          id: 'psychology',
          label: 'علم النفس',
          route: '/department-details/psychology'
        },
        {
          id: 'comparative-education',
          label: 'التربية المقارنة والإدارة التربوية',
          route: '/department-details/comparative-education'
        }
      ]
    },
    {
      id: 'Sectors',
      label: 'القطاعات',
      children: [
        {
          id: 'vice-dean-education',
          label: 'شؤون التعليم والطلاب',
          route: '/management/vice-dean-education'
        },
        {
          id: 'vice-dean-postgraduate',
          label: 'الدراسات العليا والبحوث',
          route: '/management/vice-dean-postgraduate'
        },
        {
          id: 'vice-dean-community',
          label: 'خدمة المجتمع وتنمية البيئة',
          route: '/management/vice-dean-community'
        }
      ]
    },
    {
      id: 'contact',
      label: 'تواصلوا معنا',
      route: '/contact'
    }
  ];

  private socialLinks: SocialLink[] = [
    {
      platform: 'فيسبوك',
      url: 'https://facebook.com/luxoreducation',
      icon: 'pi pi-facebook',
      color: '#1877f2'
    },
    {
      platform: 'يوتيوب',
      url: 'https://youtube.com/luxoruniversity',
      icon: 'pi pi-youtube',
      color: '#ff0000'
    },
    {
      platform: 'لينكدإن',
      url: 'https://linkedin.com/company/luxor-university',
      icon: 'pi pi-linkedin',
      color: '#0077b5'
    }
  ];

  private contactInfo: ContactInfo = {
    address: 'كلية التربية - جامعة الأقصر - مدينة طيبة الجديدة، بجوار هيئة مدينة طيبة الجديدة',
    phone: '01010577677',
    emails: {
      dean: 'waleed2507@yahoo.co.uk',
      journal: 'Lueduscij@fedu.luxor.edu.eg'
    }
  };

  private footerQuickLinks = [
    {
      label: 'موقع جامعة الأقصر',
      url: 'http://www.luxor.edu.eg/#/',
      external: true
    },
    {
      label: 'الصفحة الرسمية على فيسبوك',
      url: 'https://facebook.com/luxoreducation',
      external: true
    },
    {
      label: 'مجلة العلوم التربوية',
      url: 'https://jedul.journals.ekb.eg/',
      external: true
    },
    {
      label: 'بوابة 90',
      url: '#',
      external: true
    }
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
        route: '/about-us/Faculty-history'
      },
      {
        id: 'top-management-footer',
        label: 'كلمة العميد',
        route: '/about-us/dean-word'
      },
      {
        id: 'faculty-departments-footer',
        label: 'أقسام الكلية',
        route: '/department-details'
      },
      {
        id: 'faculty-administrations-footer',
        label: 'الإدارات الإدارية بالكلية',
        route: '/'
      },
      {
        id: 'programs-footer',
        label: 'البرامج الدراسية',
        route: '/programs'
      },
      {
        id: 'units-labs-footer',
        label: 'الوحدات والمعامل',
        route: '/'
      },
      {
        id: 'news-events-footer',
        label: 'الأخبار والفعاليات',
        route: '/news-events'
      },
      {
        id: 'contact-footer',
        label: 'تواصلوا معنا',
        route: '/contact'
      }
    ];
  }
}
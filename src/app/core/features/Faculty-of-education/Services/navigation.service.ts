import { Injectable } from '@angular/core';
import { NavItem, SocialLink, ContactInfo } from '../model/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private mainNavItems: NavItem[] = [
    {
      id: 'home',
      label: 'الرئيسية',
      route: '/home'
    },
    {
      id: 'contact',
      label: 'اتصل بنا',
      route: '/contact'
    },
    {
      id: 'About Us',
      label: 'عن الكلية',
      children: [
        {
          id: 'dean word',
          label: 'كلمة العميد',
          route: '/about-us/dean-word'
        },
        {
          id: 'vision-mission',
          label: 'الرؤية والرسالة',
          route: '/about-us/vision-mission'
        },
        {
          id: 'Staff members',
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
              label: 'معمل الحاسوب',
              route: '/labs/computer'
            },
            {
              id: 'mental-health-lab',
              label: 'معمل الصحة النفسية',
              route: '/labs/mental-health'
            },
            {
              id: 'micro-teaching-lab',
              label: 'معمل التدريس المجهري',
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
      id: 'faculty-journal',
      label: 'مجلة الكلية',
      external: true,
      url: 'https://jedul.journals.ekb.eg/'
    },
    {
      id: 'new-programs',
      label: 'البرامج الجديدة',
      children: [
        {
          id: 'math-english',
          label: 'برنامج تجهيز معلمي الرياضيات (باللغة الإنجليزية)',
          route: '/programs/new/mathematics-english'
        },
        {
          id: 'biology-english',
          label: 'برنامج تجهيز معلمي العلوم البيولوجية (باللغة الإنجليزية)',
          route: '/programs/new/biology-english'
        },
        {
          id: 'physics-english',
          label: 'برنامج تجهيز معلمي الفيزياء (باللغة الإنجليزية)',
          route: '/programs/new/physics-english'
        },
        {
          id: 'chemistry-english',
          label: 'برنامج تجهيز معلمي الكيمياء (باللغة الإنجليزية)',
          route: '/programs/new/chemistry-english'
        }
      ]
    },
    {
      id: 'academic-programs',
      label: 'البرامج الأكاديمية',
      children: [
        {
          id: 'arabic-program',
          label: 'برنامج تجهيز معلمي اللغة العربية والأدب',
          route: '/programs/academic/arabic'
        },
        {
          id: 'english-program',
          label: 'برنامج تجهيز معلمي اللغة الإنجليزية والأدب',
          route: '/programs/academic/english'
        },
        {
          id: 'french-program',
          label: 'برنامج تجهيز معلمي اللغة الفرنسية والأدب',
          route: '/programs/academic/french'
        },
        {
          id: 'german-program',
          label: 'برنامج تجهيز معلمي اللغة الألمانية والأدب',
          route: '/programs/academic/german'
        },
        {
          id: 'mathematics-program',
          label: 'برنامج تجهيز معلمي الرياضيات',
          route: '/programs/academic/mathematics'
        },
        {
          id: 'chemistry-program',
          label: 'برنامج تجهيز معلمي الكيمياء',
          route: '/programs/academic/chemistry'
        },
        {
          id: 'biology-program',
          label: 'برنامج تجهيز معلمي العلوم البيولوجية',
          route: '/programs/academic/biology'
        }
      ]
    },
    {
      id: 'faculty-administrations',
      label: 'إدارات الكلية',
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
      route: '/department',
      children: [
        {
          id: 'curricula-teaching',
          label: 'المناهج وأساليب التدريس',
          route: '/department/curricula-teaching'
        },
        {
          id: 'foundations-education',
          label: 'أسس التربية',
          route: '/department/foundations-education'
        },
        {
          id: 'mental-health',
          label: 'الصحة النفسية',
          route: '/department/mental-health'
        },
        {
          id: 'psychology',
          label: 'علم النفس',
          route: '/department/psychology'
        },
        {
          id: 'comparative-education',
          label: 'التعليم المقارن وإدارة التعليم',
          route: '/department/comparative-education'
        }
      ]
    },
    {
      id: 'top-management',
      label: 'الإدارة العليا',
      children: [
        {
          id: 'dean',
          label: 'عميد الكلية',
          route: '/management/dean'
        },
        {
          id: 'vice-dean-education',
          label: 'وكيل الكلية للتعليم وشؤون الطلاب',
          route: '/management/vice-dean-education'
        },
        {
          id: 'vice-dean-postgraduate',
          label: 'وكيل الكلية للدراسات العليا والبحث العلمي',
          route: '/management/vice-dean-postgraduate'
        },
        {
          id: 'vice-dean-community',
          label: 'وكيل الكلية لخدمة المجتمع وتنمية البيئة',
          route: '/management/vice-dean-community'
        }
      ]
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
    address: 'كلية التربية – جامعة الأقصر – مدينة طيبة الجديدة، بجوار هيئة مدينة طيبة الجديدة',
    phone: '01010577677',
    emails: {
      dean: 'waleed2507@yahoo.co.uk',
      journal: 'Lueduscij@fedu.luxor.edu.eg'
    }
  };

  private footerQuickLinks = [
    {
      label: 'الجامعة الأم',
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
        route: '/about'
      },
      {
        id: 'top-management-footer',
        label: 'الإدارة العليا',
        route: '/management'
      },
      {
        id: 'faculty-departments-footer',
        label: 'أقسام الكلية',
        route: '/department'
      },
      {
        id: 'faculty-administrations-footer',
        label: 'إدارات الكلية',
        route: '/administrations'
      },
      {
        id: 'academic-programs-footer',
        label: 'البرامج الأكاديمية',
        route: '/programs/academic'
      },
      {
        id: 'new-programs-footer',
        label: 'البرامج الجديدة',
        route: '/programs/new'
      },
      {
        id: 'units-labs-footer',
        label: 'الوحدات والمعامل',
        route: '/units-labs'
      },
      {
        id: 'news-events-footer',
        label: 'الأخبار والفعاليات',
        route: '/news-events'
      },
      {
        id: 'contact-footer',
        label: 'اتصل بنا',
        route: '/contact'
      }
    ];
  }
}
import { Injectable } from '@angular/core';
import { ServiceCategory, StatisticTab, StaffMember } from '../model/services.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyDataService {

  getStudentServices(): ServiceCategory[] {
    return [
      {
        id: 'prospective',
        title: 'الطلاب الراغبين في الالتحاق',
        description: 'دعم شامل للطلاب الذين يفكرون في التسجيل',
        icon: 'pi pi-users',
        services: [
          {
            id: 'guidance',
            title: 'الإرشاد الأكاديمي',
            description: 'الإرشاد والتوجيه حول أنظمة الدراسة والبرامج الأكاديمية'
          },
          {
            id: 'technical-support',
            title: 'الدعم الفني',
            description: 'دعم فني أثناء عملية التقديم عبر الإنترنت'
          },
          {
            id: 'inquiries',
            title: 'استفسارات القبول',
            description: 'الرد على الاستفسارات حول متطلبات القبول'
          }
        ],
        deliveryMethods: [
          { id: 'booklets', method: 'كتيبات الإرشاد', icon: 'pi pi-book' },
          { id: 'online', method: 'المنصات الإلكترونية', icon: 'pi pi-desktop' },
          { id: 'reception', method: 'مكاتب الاستقبال والمعلومات', icon: 'pi pi-building' }
        ]
      },
      {
        id: 'current',
        title: 'الطلاب الحاليين',
        description: 'خدمات أساسية للطلاب الجامعيين',
        icon: 'pi pi-graduation-cap',
        services: [
          {
            id: 'registration',
            title: 'تسجيل المقررات',
            description: 'إدارة تسجيل المقررات وجدولة الحصص'
          },
          {
            id: 'counseling',
            title: 'الإرشاد الأكاديمي',
            description: 'خدمات الإرشاد الأكاديمي والنفسي'
          },
          {
            id: 'health',
            title: 'خدمات الصحة',
            description: 'خدمات الصحة والعلاج الطبي للطلاب'
          },
          {
            id: 'activities',
            title: 'أنشطة الطلاب',
            description: 'أنشطة ثقافية ورياضية واجتماعية'
          },
          {
            id: 'financial',
            title: 'الدعم المالي',
            description: 'صندوق التضامن وبرامج المساعدات الطلابية'
          }
        ],
        deliveryMethods: [
          { id: 'portals', method: 'البوابات الإلكترونية', icon: 'pi pi-globe' },
          { id: 'workshops', method: 'ورش العمل', icon: 'pi pi-cog' },
          { id: 'apps', method: 'التطبيقات الذكية', icon: 'pi pi-mobile' }
        ]
      },
      {
        id: 'postgraduate',
        title: 'الطلاب الدراسات العليا',
        description: 'دعم متخصص لطلاب البحث العلمي الخريجين',
        icon: 'pi pi-star',
        services: [
          {
            id: 'research-registration',
            title: 'تسجيل البحث',
            description: 'تسجيل ومتابعة خطط البحث'
          },
          {
            id: 'supervision',
            title: 'الإشراف الأكاديمي',
            description: 'الإشراف الأكاديمي ودعم البحث'
          },
          {
            id: 'publishing',
            title: 'النشر العلمي',
            description: 'تسهيل النشر العلمي ومشاركة المؤتمرات'
          },
          {
            id: 'training',
            title: 'ورش التدريب',
            description: 'توفير ورش تدريبية ومنصات'
          }
        ],
        deliveryMethods: [
          { id: 'seminars', method: 'الندوات', icon: 'pi pi-microphone' },
          { id: 'meetings', method: 'الاجتماعات', icon: 'pi pi-users' },
          { id: 'communication', method: 'التواصل الإلكتروني', icon: 'pi pi-desktop' }
        ]
      }
    ];
  }

  getStatistics(): StatisticTab[] {
    return [
      {
        id: 'enrolled-students',
        title: 'إحصائيات الطلاب المسجلين – العام الدراسي 2024/2025',
        data: [
          { label: 'اللغة العربية', value: 25 },
          { label: 'اللغة الإنجليزية', value: 26 },
          { label: 'الفيزياء', value: 22 },
          { label: 'الكيمياء', value: 37 },
          { label: 'الرياضيات', value: 52 },
          { label: 'الأحياء', value: 36 }
        ]
      },
      {
        id: 'postgraduate-diploma',
        title: 'دبلوم التربية العليا (نظام الساعات المعتمدة) – 2024/2025',
        data: [
          {
            label: 'مسار معلم الصف (المراحل 1-3)',
            value: 89,
            subItems: [
              { label: 'إجمالي الطلاب', male: 14, female: 75, total: 89 }
            ]
          },
          {
            label: 'مسار معلم المرحلة الابتدائية العليا (المراحل 4-6)',
            value: 0,
            subItems: []
          },
          {
            label: 'مسار معلم المادة (المراحل 7-12)',
            value: 0,
            subItems: []
          },
          {
            label: 'إجمالي التسجيل في البرنامج',
            value: 248,
            subItems: [
              { label: 'كل المسارات مجتمعة', male: 45, female: 203, total: 248 }
            ]
          }
        ]
      }
    ];
  }

  getStaffMembers(): StaffMember[] {
    return [
      {
        id: 1,
        name: 'د. محمد عطا نجدي',
        position: 'أستاذ لغوي أول',
        phone: '01095953313',
        department: 'اللغات'
      },
      {
        id: 2,
        name: 'محمود محمد إبراهيم',
        position: 'أمين الكلية',
        phone: '01006820901',
        department: 'الإدارة'
      },
      {
        id: 3,
        name: 'سامح محمد رمضان',
        position: 'شؤون الدراسات العليا + مسؤول بصمة',
        phone: '01023425622',
        department: 'الدراسات العليا'
      },
      {
        id: 4,
        name: 'عبد الله عبد الجليل علي',
        position: 'مسؤول المكتبة + كاتب',
        phone: '01004212220',
        department: 'خدمات المكتبة'
      },
      {
        id: 5,
        name: 'حسن يوسف حصب الله',
        position: 'مسؤول شؤون الشباب',
        phone: '01069310171',
        department: 'شؤون الطلاب'
      },
      {
        id: 6,
        name: 'حمدي محمد عطا',
        position: 'ممثل الدفعات',
        phone: '01091450814',
        department: 'المالية'
      },
      {
        id: 7,
        name: 'كريمة سيد علي',
        position: 'مسؤولة شؤون الطلاب',
        phone: '01099164895',
        department: 'شؤون الطلاب'
      },
      {
        id: 8,
        name: 'فاطمة عثمان جابر',
        position: 'مسؤولة الموارد البشرية',
        phone: '01013638940',
        department: 'الموارد البشرية'
      },
      {
        id: 9,
        name: 'أسماء عبد الرحيم زكي',
        position: 'أمينة المخازن',
        phone: '01010929621',
        department: 'الإدارة'
      },
      {
        id: 10,
        name: 'نجلاء جمال بشير',
        position: 'موظفة شؤون الطلاب',
        phone: '01273111375',
        department: 'شؤون الطلاب'
      },
      {
        id: 11,
        name: 'فايزة أحمد حساني',
        position: 'مساعدة الخدمات',
        phone: '01005758697',
        department: 'الخدمات العامة'
      }
    ];
  }
}
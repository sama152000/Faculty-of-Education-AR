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
        title: 'الطلاب المستقبليين',
        description: 'دعم شامل للطلاب الراغبين في التسجيل',
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
            description: 'الدعم الفني أثناء عملية التقديم عبر الإنترنت'
          },
          {
            id: 'inquiries',
            title: 'استفسارات القبول',
            description: 'الرد على استفسارات متطلبات القبول'
          }
        ],
        deliveryMethods: [
          { id: 'booklets', method: 'كتيبات إرشادية', icon: 'pi pi-book' },
          { id: 'online', method: 'منصات إلكترونية', icon: 'pi pi-desktop' },
          { id: 'reception', method: 'مكاتب الاستقبال والمعلومات', icon: 'pi pi-building' }
        ]
      },
      {
        id: 'current',
        title: 'الطلاب الحاليين',
        description: 'خدمات أساسية لطلاب البكالوريوس',
        icon: 'pi pi-graduation-cap',
        services: [
          {
            id: 'registration',
            title: 'تسجيل المقررات',
            description: 'تسجيل المقررات وإدارة الجداول الدراسية'
          },
          {
            id: 'counseling',
            title: 'الإرشاد الأكاديمي والنفسي',
            description: 'خدمات الإرشاد الأكاديمي والنفسي'
          },
          {
            id: 'health',
            title: 'الخدمات الصحية',
            description: 'الخدمات الصحية والطبية للطلاب'
          },
          {
            id: 'activities',
            title: 'الأنشطة الطلابية',
            description: 'الأنشطة الثقافية والرياضية والاجتماعية'
          },
          {
            id: 'financial',
            title: 'الدعم المالي',
            description: 'صندوق التكافل وبرامج مساعدة الطلاب'
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
        title: 'طلاب الدراسات العليا',
        description: 'دعم متخصص لطلاب البحث في الدراسات العليا',
        icon: 'pi pi-star',
        services: [
          {
            id: 'research-registration',
            title: 'تسجيل الأبحاث',
            description: 'تسجيل ومتابعة خطط الأبحاث'
          },
          {
            id: 'supervision',
            title: 'الإشراف الأكاديمي',
            description: 'الإشراف الأكاديمي ودعم الأبحاث'
          },
          {
            id: 'publishing',
            title: 'النشر العلمي',
            description: 'تسهيل النشر العلمي والمشاركة في المؤتمرات'
          },
          {
            id: 'training',
            title: 'ورش التدريب',
            description: 'توفير ورش تدريب ومنصات تعليمية'
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
          { label: 'العلوم البيولوجية', value: 36 }
        ]
      },
      {
        id: 'postgraduate-diploma',
        title: 'دبلوم الدراسات العليا في التربية (نظام الساعات المعتمدة) – 2024/2025',
        data: [
          {
            label: 'مسار معلم الصف (الصفوف 1-3)',
            value: 89,
            subItems: [
              { label: 'إجمالي الطلاب', male: 14, female: 75, total: 89 }
            ]
          },
          {
            label: 'مسار معلم المرحلة الابتدائية العليا (الصفوف 4-6)',
            value: 34,
            subItems: [
              { label: 'إجمالي الطلاب', male: 9, female: 25, total: 34 }
            ]
          },
          {
            label: 'مسار معلم المواد (الصفوف 7-12)',
            value: 248,
            subItems: [
              { label: 'إجمالي الطلاب', male: 45, female: 203, total: 248 }
            ]
          },
          {
            label: 'إجمالي التسجيل في البرنامج',
            value: 248,
            subItems: [
              { label: 'جميع المسارات مجتمعة', male: 45, female: 203, total: 248 }
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
        position: 'مدرب لغة أول',
        phone: '01095953313',
        department: 'اللغات'
      },
      {
        id: 2,
        name: 'محمود محمد إبراهيم',
        position: 'سكرتير الكلية',
        phone: '01006820901',
        department: 'الإدارة'
      },
      {
        id: 3,
        name: 'سامح محمد رمضان',
        position: 'شؤون الدراسات العليا + مسئول البصمة',
        phone: '01023425622',
        department: 'الدراسات العليا'
      },
      {
        id: 4,
        name: 'عبدالله عبد الجليل علي',
        position: 'مسئول المكتبة + كاتب',
        phone: '01004212220',
        department: 'خدمات المكتبة'
      },
      {
        id: 5,
        name: 'حسن يوسف حسب الله',
        position: 'مسئول رعاية الشباب',
        phone: '01069310171',
        department: 'شؤون الطلاب'
      },
      {
        id: 6,
        name: 'حمدي محمد عطا',
        position: 'مندوب الدفع',
        phone: '01091450814',
        department: 'المالية'
      },
      {
        id: 7,
        name: 'كريمة سيد علي',
        position: 'مسئولة شؤون الطلاب',
        phone: '01099164895',
        department: 'شؤون الطلاب'
      },
      {
        id: 8,
        name: 'فاطمة عثمان جابر',
        position: 'مسئولة الموارد البشرية',
        phone: '01013638940',
        department: 'الموارد البشرية'
      },
      {
        id: 9,
        name: 'أسماء عبد الرحيم زكي',
        position: 'سكرتيرة المخازن',
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
        position: 'مساعدة خدمات',
        phone: '01005758697',
        department: 'الخدمات العامة'
      }
    ];
  }
}
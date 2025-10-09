import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department, DepartmentNavigation } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departments: Department[] = [
    {
      id: 'curricula-teaching',
      name: 'المناهج وطرق التدريس',
      description: 'يتخصص في إعداد معلمي المستقبل وتطوير طرق التدريس الحديثة وتطبيقاتها عبر مختلف المواد الأكاديمية.',
      icon: 'pi pi-book',
      order: 1,
      viceDean: 'أ.د. أحمد حسن محمد',
      subjects: [
        'طرق تدريس اللغة العربية',
        'طرق تدريس الرياضيات',
        'طرق تدريس العلوم',
        'تطوير وتصميم المناهج',
        'التكنولوجيا التربوية',
        'أساليب التقييم والتقويم',
        'طرق تدريس التربية الخاصة',
        'طرق تدريس الدراسات الاجتماعية'
      ],
      objectives: [
        'إعداد معلمين مؤهلين قادرين على استخدام طرق تدريس حديثة',
        'تطوير مناهج مبتكرة تلبي احتياجات التعليم المعاصر',
        'تعزيز استخدام التكنولوجيا التربوية في العمليات التعليمية',
        'تحسين أساليب التقييم والتقويم في التعليم',
        'إجراء بحوث في تطوير المناهج وطرق التدريس',
        'توفير برامج تدريبية للمعلمين أثناء الخدمة',
        'تعزيز التفكير النقدي والإبداع في الممارسات التعليمية'
      ],
      services: [
        'برامج إعداد وتدريب المعلمين',
        'استشارات تطوير المناهج',
        'دعم دمج التكنولوجيا التربوية',
        'تصميم وتنفيذ التقييم',
        'الإشراف والتوجيه البحثي',
        'ورش عمل للتطوير المهني',
        'تطوير المواد التعليمية',
        'الإشراف على التدريب العملي'
      ],
      route: 'department-details/curricula-teaching'
    },
    {
      id: 'foundations-education',
      name: 'أصول التربية',
      description: 'يركز على دراسة الفلسفات والمبادئ الأساسية للتعليم، وعلاقته بالمجتمع، وتطوير السياسات التعليمية.',
      icon: 'pi pi-building',
      order: 2,
      viceDean: 'أ.د. فاطمة علي إبراهيم',
      subjects: [
        'فلسفة التربية',
        'تاريخ التربية',
        'علم اجتماع التربية',
        'اقتصاديات التربية',
        'التربية المقارنة',
        'السياسة والتخطيط التربوي',
        'مناهج البحث التربوي',
        'الأخلاقيات في التربية'
      ],
      objectives: [
        'فهم الأسس الفلسفية للنظم التربوية',
        'تحليل التطور التاريخي للفكر التربوي',
        'دراسة العلاقة بين التعليم والمجتمع',
        'تطوير سياسات تربوية مبنية على مبادئ سليمة',
        'إجراء دراسات مقارنة للنظم التعليمية',
        'تعزيز الممارسات الأخلاقية في البيئات التعليمية',
        'تعزيز التحليل النقدي للقضايا التربوية'
      ],
      services: [
        'استشارات السياسات التربوية',
        'أبحاث التاريخ التربوي',
        'تحليل الفلسفة التربوية',
        'دراسات التربية المقارنة',
        'دعم التخطيط التربوي',
        'تدريب مناهج البحث',
        'ورش عمل الأخلاقيات في التربية',
        'توجيه إصلاح التعليم'
      ],
      route: 'department-details/foundations-education'
    },
    {
      id: 'mental-health',
      name: 'الصحة النفسية',
      description: 'مكرس لدراسة الصحة النفسية للطلاب والمعلمين، وتقديم برامج دعم وخدمات الإرشاد النفسي.',
      icon: 'pi pi-heart',
      order: 3,
      viceDean: 'أ.د. محمد سعيد عبد الرحمن',
      subjects: [
        'مبادئ الصحة النفسية',
        'الإرشاد النفسي',
        'التدخل في الأزمات',
        'تقنيات العلاج الجماعي',
        'الصحة النفسية للأطفال والمراهقين',
        'إدارة الضغوط النفسية',
        'الاضطرابات السلوكية',
        'التواصل العلاجي'
      ],
      objectives: [
        'تعزيز الوعي بالصحة النفسية في البيئات التعليمية',
        'تقديم خدمات إرشاد نفسي فعالة',
        'تطوير برامج تدخل لقضايا الصحة النفسية',
        'تدريب المحترفين على دعم الصحة النفسية',
        'إجراء بحوث حول الصحة النفسية التعليمية',
        'خلق بيئات داعمة للطلاب وأعضاء هيئة التدريس',
        'تنفيذ برامج الوقاية من الاضطرابات النفسية'
      ],
      services: [
        'الإرشاد النفسي الفردي',
        'جلسات العلاج الجماعي',
        'دعم التدخل في الأزمات',
        'تقييم الصحة النفسية',
        'برامج إدارة الضغوط النفسية',
        'ورش عمل تدريبية مهنية',
        'خدمات البحث والتقييم',
        'برامج التوعية المجتمعية'
      ],
      route: 'department-details/mental-health'
    },
    {
      id: 'psychology',
      name: 'علم النفس',
      description: 'يستكشف السلوك البشري وعمليات التعلم، مع التركيز على تطبيقات علم النفس التربوي.',
      icon: 'pi pi-users',
      order: 4,
      viceDean: 'أ.د. نادية محمود حسن',
      subjects: [
        'علم النفس التربوي',
        'علم النفس التطوري',
        'علم النفس الإدراكي',
        'نظريات التعلم',
        'الاختبارات والقياسات النفسية',
        'علم النفس السلوكي',
        'علم النفس الاجتماعي',
        'مناهج البحث في علم النفس'
      ],
      objectives: [
        'فهم المبادئ النفسية في السياقات التعليمية',
        'تطبيق نظريات التعلم لتحسين النتائج التعليمية',
        'تطوير أدوات تقييم نفسية',
        'إجراء بحوث حول السلوك البشري والتعلم',
        'تدريب المعلمين على المبادئ النفسية',
        'تعزيز الممارسات التعليمية القائمة على الأدلة',
        'دعم الفروق الفردية في التعلم'
      ],
      services: [
        'التقييم والاختبار النفسي',
        'استشارات علم النفس التربوي',
        'تقييم صعوبات التعلم',
        'برامج التدخل السلوكي',
        'تصميم وتحليل البحوث',
        'تدريب التطوير المهني',
        'الإشراف على الأبحاث النفسية',
        'تقييم البرامج التعليمية'
      ],
      route: 'department-details/psychology'
    },
    {
      id: 'comparative-education',
      name: 'التربية المقارنة والإدارة التربوية',
      description: 'يهتم بدراسة النظم التعليمية حول العالم وإدارة المؤسسات التعليمية باستخدام أساليب حديثة وفعالة.',
      icon: 'pi pi-globe',
      order: 5,
      viceDean: 'أ.د. عمر عبد العزيز محمد',
      subjects: [
        'النظم التعليمية المقارنة',
        'الإدارة التربوية',
        'القيادة التربوية',
        'إدارة المدارس',
        'التمويل التربوي',
        'الموارد البشرية في التعليم',
        'ضمان جودة التعليم',
        'السياسات التعليمية الدولية'
      ],
      objectives: [
        'مقارنة النظم التعليمية بين الدول المختلفة',
        'تطوير ممارسات إدارية تربوية فعالة',
        'تدريب القادة والإداريين التربويين',
        'تحسين نظم إدارة المدارس',
        'تعزيز ضمان جودة التعليم',
        'تعزيز التعاون التعليمي الدولي',
        'إجراء بحوث حول الحوكمة التعليمية'
      ],
      services: [
        'تحليل النظم التعليمية',
        'برامج تدريب إدارية',
        'ورش عمل تطوير القيادة',
        'استشارات إدارة المدارس',
        'تقييم ضمان الجودة',
        'دعم تطوير السياسات',
        'شراكات التعليم الدولي',
        'أبحاث ودراسات مقارنة'
      ],
      route: 'department-details/comparative-education'
    }
  ];

  getAllDepartments(): Observable<Department[]> {
    return of(this.departments.sort((a, b) => a.order - b.order));
  }

  getDepartmentByRoute(route: string): Observable<Department | null> {
    const department = this.departments.find(d => d.route === route);
    return of(department || null);
  }

  getDepartmentById(id: string): Observable<Department | null> {
    const department = this.departments.find(d => d.id === id);
    return of(department || null);
  }

  getDepartmentNavigation(currentDepartmentId: string): Observable<DepartmentNavigation> {
    const sortedDepartments = this.departments.sort((a, b) => a.order - b.order);
    const currentIndex = sortedDepartments.findIndex(d => d.id === currentDepartmentId);

    const navigation: DepartmentNavigation = {
      previous: currentIndex > 0 ? sortedDepartments[currentIndex - 1] : null,
      next: currentIndex < sortedDepartments.length - 1 ? sortedDepartments[currentIndex + 1] : null
    };

    return of(navigation);
  }

  getNextDepartment(currentDepartmentId: string): Observable<Department | null> {
    const sortedDepartments = this.departments.sort((a, b) => a.order - b.order);
    const currentIndex = sortedDepartments.findIndex(d => d.id === currentDepartmentId);

    if (currentIndex !== -1 && currentIndex < sortedDepartments.length - 1) {
      return of(sortedDepartments[currentIndex + 1]);
    }

    return of(null);
  }

  getPreviousDepartment(currentDepartmentId: string): Observable<Department | null> {
    const sortedDepartments = this.departments.sort((a, b) => a.order - b.order);
    const currentIndex = sortedDepartments.findIndex(d => d.id === currentDepartmentId);

    if (currentIndex > 0) {
      return of(sortedDepartments[currentIndex - 1]);
    }

    return of(null);
  }
}
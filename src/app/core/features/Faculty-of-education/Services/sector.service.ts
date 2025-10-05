import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sector, SectorNavigation } from '../model/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private sectors: Sector[] = [
    {
      id: 'education-student-affairs',
      title: 'قطاع التعليم وشؤون الطلاب',
      viceDean: 'أ.م.د. رمضان القلماوي',
      objectives: [
        'تنظيم وتطوير العملية التعليمية على مستوى الدراسات الجامعية.',
        'توفير بيئة تعليمية داعمة ومحفزة للطلاب.',
        'تعزيز شعور الطلاب بالانتماء وتطوير مهاراتهم الشخصية.',
        'دعم الأنشطة الطلابية وبناء مهارات القيادة والتواصل.'
      ],
      services: [
        'تسجيل الطلاب الجدد وتحديث سجلاتهم.',
        'إعداد الجداول الأكاديمية والامتحانية.',
        'إصدار الشهادات، التقارير، ونصوص الدرجات.',
        'تنظيم الأنشطة الطلابية (ثقافية، رياضية، فنية، واجتماعية).',
        'توفير الدعم الأكاديمي والإرشاد التعليمي.'
      ],
      route: 'management/vice-dean-education',
      order: 1
    },
    {
      id: 'postgraduate-research',
      title: 'قطاع الدراسات العليا وشؤون البحث العلمي',
      viceDean: 'أ.م.د. صلاح شعبان حسين',
      objectives: [
        'تطوير برامج الدراسات العليا بما يتماشى مع التطورات العلمية.',
        'دعم البحث العلمي وتوجيهه لخدمة احتياجات المجتمع.',
        'توفير بيئة بحثية محفزة ومهنية.',
        'تشجيع النشر العلمي والمشاركة في المؤتمرات.'
      ],
      services: [
        'تسجيل طلاب الدبلوم، الماجستير، والدكتوراه.',
        'متابعة خطط البحث وتكوين لجان المناقشة.',
        'تنظيم المؤتمرات العلمية والندوات المتخصصة.',
        'توفير الدعم التقني والإداري للباحثين.',
        'إشراف على المجلات العلمية والبحوث المنشورة.'
      ],
      route: 'management/vice-dean-postgraduate',
      order: 2
    },
    {
      id: 'community-environmental',
      title: 'قطاع خدمة المجتمع وتنمية البيئة',
      viceDean: 'أ.م.د. هاني عبد الفتاح شورى',
      objectives: [
        'تعزيز العلاقة بين الكلية والمجتمع المحلي.',
        'المساهمة في تحقيق التنمية المستدامة.',
        'توفير حلول علمية وعملية لمشكلات المجتمع.',
        'تعزيز الوعي التعليمي، الثقافي، والبيئي.'
      ],
      services: [
        'تنظيم الحملات التعليمية، الثقافية، والتوعوية.',
        'إقامة دورات تدريبية وورش عمل للأفراد والمؤسسات.',
        'تنفيذ مشاريع تخدم المجتمع والبيئة.',
        'التعاون مع المنظمات الحكومية وغير الحكومية.',
        'إجراء دراسات ميدانية حول القضايا البيئية والمجتمعية.'
      ],
      route: 'management/vice-dean-community',
      order: 3
    }
  ];

  getAllSectors(): Observable<Sector[]> {
    return of(this.sectors.sort((a, b) => a.order - b.order));
  }

  getSectorByRoute(route: string): Observable<Sector | null> {
    const sector = this.sectors.find(s => s.route === route);
    return of(sector || null);
  }

  getSectorById(id: string): Observable<Sector | null> {
    const sector = this.sectors.find(s => s.id === id);
    return of(sector || null);
  }

  getSectorNavigation(currentSectorId: string): Observable<SectorNavigation> {
    const sortedSectors = this.sectors.sort((a, b) => a.order - b.order);
    const currentIndex = sortedSectors.findIndex(s => s.id === currentSectorId);
    
    const navigation: SectorNavigation = {
      previous: currentIndex > 0 ? sortedSectors[currentIndex - 1] : null,
      next: currentIndex < sortedSectors.length - 1 ? sortedSectors[currentIndex + 1] : null
    };

    return of(navigation);
  }

  getNextSector(currentSectorId: string): Observable<Sector | null> {
    const sortedSectors = this.sectors.sort((a, b) => a.order - b.order);
    const currentIndex = sortedSectors.findIndex(s => s.id === currentSectorId);
    
    if (currentIndex !== -1 && currentIndex < sortedSectors.length - 1) {
      return of(sortedSectors[currentIndex + 1]);
    }
    
    return of(null);
  }

  getPreviousSector(currentSectorId: string): Observable<Sector | null> {
    const sortedSectors = this.sectors.sort((a, b) => a.order - b.order);
    const currentIndex = sortedSectors.findIndex(s => s.id === currentSectorId);
    
    if (currentIndex > 0) {
      return of(sortedSectors[currentIndex - 1]);
    }
    
    return of(null);
  }
}
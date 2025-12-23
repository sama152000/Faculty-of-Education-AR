import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnifiedProgramsService {
  private programs: any[] = [
    // ============================
    // 🎓 البرامج الأكاديمية (القديمة)
    // ============================
    {
      id: 'arabic',
      name: 'اللغة العربية',
      shortDescription:
        'يُعد معلمي المستقبل المتخصصين في اللغة العربية وآدابها باستخدام طرق تعليمية حديثة.',
      fullDescription:
        'يهدف هذا البرنامج إلى إعداد معلمين يتمتعون بإتقان قوي للغة العربية وآدابها، مؤهلين للتدريس بفعالية من خلال طرق وأدوات تعليمية حديثة.',
      images: [
        'https://images.pexels.com/photos/19884485/pexels-photo-19884485.jpeg',
      ],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      isNew: false,
    },
    {
      id: 'english',
      name: 'اللغة الإنجليزية',
      shortDescription:
        'يطور معلمي اللغة الإنجليزية بمهارات لغوية وأدبية وتربوية قوية.',
      fullDescription:
        'يركز هذا البرنامج على تزويد الطلاب بمهارات متقدمة في اللغة الإنجليزية، والوعي الثقافي، ومنهجيات التعليم لإعدادهم كمعلمين مؤهلين للغة الإنجليزية.',
      images: [
        'https://images.pexels.com/photos/4143792/pexels-photo-4143792.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      isNew: false,
    },
    {
      id: 'french',
      name: 'اللغة الفرنسية',
      shortDescription:
        'يُعد معلمي اللغة الفرنسية المحترفين وفقاً للمعايير التعليمية العالمية.',
      fullDescription:
        'برنامج مصمم لإعداد معلمين يستطيعون تدريس اللغة الفرنسية بكفاءة وإبداع، مع دمج مهارات التواصل والأساليب التعليمية الحديثة.',
      images: [
        'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      isNew: false,
    },
    {
      id: 'german',
      name: 'اللغة الألمانية',
      shortDescription:
        'برنامج متخصص لإعداد معلمي اللغة الألمانية بمهارات تدريس حديثة.',
      fullDescription:
        'يوفر هذا البرنامج دراسة متعمقة للغة الألمانية وآدابها، مع التدريب العملي على التدريس والتدريب التربوي الحديث.',
      images: [
        'https://images.pexels.com/photos/3184425/pexels-photo-3184425.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      isNew: false,
    },
    {
      id: 'math',
      name: 'الرياضيات',
      shortDescription:
        'يؤهل معلمي المستقبل بمهارات قوية في الرياضيات وحل المشكلات.',
      fullDescription:
        'يركز هذا البرنامج على إعداد معلمي الرياضيات بمعرفة عميقة بالمادة وأساليب تدريس مبتكرة لتطوير التفكير التحليلي والمنطقي لدى الطلاب.',
      images: [
        'https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      isNew: false,
    },
    {
      id: 'chemistry',
      name: 'الكيمياء',
      shortDescription:
        'يوفر تدريباً متخصصاً لمعلمي الكيمياء المستقبليين مع تجربة عملية في المختبرات.',
      fullDescription:
        'برنامج مصمم لإعداد معلمي الكيمياء القادرين على شرح المفاهيم العلمية بفعالية من خلال التجارب العملية وتقنيات التعليم الحديثة.',
      images: [
        'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      isNew: false,
    },
    {
      id: 'biology',
      name: 'العلوم البيولوجية',
      shortDescription:
        'يدرب معلمي البيولوجيا المستقبليين بمهارات تدريس وبحث حديثة.',
      fullDescription:
        'يهدف البرنامج إلى إنتاج معلمين متخصصين في العلوم البيولوجية القادرين على تدريس وتطبيق المفاهيم البيولوجية الحديثة والتقنيات في التعليم.',
      images: [
        'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      isNew: false,
    },

    // ============================
    // 🌟 البرامج الجديدة (بالإنجليزية)
    // ============================
    {
      id: 'math-english',
      name: 'الرياضيات (بالإنجليزية)',
      shortDescription:
        'برنامج متقدم في الرياضيات باللغة الإنجليزية يركز على مهارات التدريس التحليلية الحديثة.',
      fullDescription:
        'يهدف هذا البرنامج إلى إعداد معلمي رياضيات متخصصين يدرسون باللغة الإنجليزية، مع دمج التفكير التحليلي والمعايير التعليمية العالمية.',
      images: [
        'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      icon: 'pi pi-calculator',
      isNew: true,
    },
    {
      id: 'biology-english',
      name: 'العلوم البيولوجية (بالإنجليزية)',
      shortDescription:
        'يركز على تدريب معلمي البيولوجيا لتدريس المفاهيم العلمية باللغة الإنجليزية.',
      fullDescription:
        'يؤهل هذا البرنامج معلمي البيولوجيا القادرين على التدريس باللغة الإنجليزية باستخدام أساليب مبتكرة وفهم علمي متقدم.',
      images: [
        'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      icon: 'pi pi-globe',
      isNew: true,
    },
    {
      id: 'physics-english',
      name: 'الفيزياء (بالإنجليزية)',
      shortDescription:
        'يُعد معلمي الفيزياء لتقديم الدروس باللغة الإنجليزية مع تدريب عملي في المختبرات.',
      fullDescription:
        'يدرب هذا البرنامج الطلاب على إتقان مفاهيم الفيزياء وتدريسها بفعالية باللغة الإنجليزية، مدعوماً بالتطبيقات المختبرية ودمج البحث.',
      images: [
        'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      icon: 'pi pi-atom',
      isNew: true,
    },
    {
      id: 'chemistry-english',
      name: 'الكيمياء (بالإنجليزية)',
      shortDescription:
        'يطور معلمي الكيمياء للتدريس باللغة الإنجليزية من خلال التجارب والاستقصاء العلمي.',
      fullDescription:
        'يُعد هذا البرنامج معلمين يتمتعون بمهارات تواصل قوية باللغة الإنجليزية ومهارات علمية لتدريس الكيمياء باستخدام التجارب والممارسات التعليمية العالمية.',
      images: [
        'https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية',
      icon: 'pi pi-flask',
      isNew: true,
    },
  ];

  // ============================
  // ✅ دوال الخدمة
  // ============================
  getAllPrograms(): Observable<any[]> {
    return of(this.programs);
  }

  getProgramById(id: string): Observable<any | undefined> {
    const program = this.programs.find((p) => p.id === id);
    return of(program);
  }

  getNewPrograms(): Observable<any[]> {
    return of(this.programs.filter((p) => p.isNew));
  }

  searchPrograms(searchTerm: string): Observable<any[]> {
    if (!searchTerm.trim()) return of(this.programs);
    const filtered = this.programs.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false)
    );
    return of(filtered);
  }

  getNextProgram(currentId: string): any | undefined {
    const currentIndex = this.programs.findIndex((p) => p.id === currentId);
    if (currentIndex === -1 || currentIndex === this.programs.length - 1) {
      return this.programs[0];
    }
    return this.programs[currentIndex + 1];
  }

  getPreviousProgram(currentId: string): any {
    const currentIndex = this.programs.findIndex((p) => p.id === currentId);
    if (currentIndex === -1 || currentIndex === 0) {
      return this.programs[this.programs.length - 1];
    }
    return this.programs[currentIndex - 1];
  }
}

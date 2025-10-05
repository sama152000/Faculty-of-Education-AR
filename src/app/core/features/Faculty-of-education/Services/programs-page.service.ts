import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Program } from '../model/program-page.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  private programs: Program[] = [
    {
      id: 1,
      name: 'برنامج تجهيز معلمي اللغة العربية والأدب',
      shortDescription: 'برنامج متخصص لتجهيز معلمي اللغة العربية والأدب بأساليب تعليمية حديثة',
      fullDescription: 'يهدف هذا البرنامج إلى تجهيز معلمين متخصصين في اللغة العربية والأدب، قادرين على تدريس فروع اللغة العربية المختلفة بما في ذلك النحو، الصرف، البلاغة، الأدب، والنقد. يشمل البرنامج دراسات معمقة في الأدب العربي القديم والحديث، النحو والصرف، البلاغة والنقد الأدبي، بالإضافة إلى دورات تعليمية تؤهل الخريجين للعمل في مجال التعليم. كما يركز البرنامج على تطوير مهارات الطلاب اللغوية والبحثية وتزويدهم بأساليب تعليمية حديثة في تدريس اللغة العربية.',
      images: ['https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية'
    },
    {
      id: 2,
      name: 'برنامج تجهيز معلمي اللغة الفرنسية والأدب',
      shortDescription: 'برنامج متميز لتجهيز معلمي اللغة الفرنسية والأدب وفقًا للمعايير الدولية',
      fullDescription: 'يهدف هذا البرنامج إلى تخريج معلمين متميزين في اللغة الفرنسية والأدب، قادرين على التدريس بكفاءة على مختلف المستويات التعليمية. يشمل البرنامج دراسة شاملة للأدب الفرنسي والفرنكوفوني، قواعد اللغة الفرنسية، الترجمة، الحضارة والثقافة الفرنسية، بالإضافة إلى دورات تعليمية متخصصة. يركز البرنامج على تطوير المهارات اللغوية الأربع (الاستماع، التحدث، القراءة، الكتابة) وإتقان استخدام التكنولوجيات الحديثة في تدريس اللغة الفرنسية كلغة أجنبية.',
      images: ['https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية'
    },
    {
      id: 3,
      name: 'برنامج تجهيز معلمي اللغة الإنجليزية والأدب',
      shortDescription: 'برنامج شامل لتجهيز معلمي اللغة الإنجليزية بمهارات تدريس متقدمة',
      fullDescription: 'يهدف البرنامج إلى تجهيز معلمين كفؤين في اللغة الإنجليزية والأدب، مزودين بالمعرفة اللغوية والأدبية والتربوية اللازمة للتدريس الفعال. يشمل البرنامج دراسة معمقة للأدب الإنجليزي والأمريكي، اللسانيات التطبيقية، أساليب تدريس اللغة الإنجليزية كلغة أجنبية، الترجمة، والنقد الأدبي. يركز البرنامج على تطوير الكفاءة اللغوية للطلاب في جميع المهارات اللغوية، تدريبهم على استخدام وسائل وتكنولوجيا التعليم الحديثة في التدريس، بالإضافة إلى تطوير قدراتهم البحثية والنقدية.',
      images: ['https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية'
    },
    {
      id: 4,
      name: 'برنامج تجهيز معلمي الرياضيات',
      shortDescription: 'برنامج متقدم لتجهيز معلمي الرياضيات بمهارات تحليلية وتدريسية عالية',
      fullDescription: 'يهدف هذا البرنامج إلى تجهيز معلمي الرياضيات المتميزين الذين يتمتعون بفهم عميق للمفاهيم الرياضية وقدرة على نقلها للطلاب بطرق مبتكرة وفعالة. يشمل البرنامج دراسة شاملة في فروع الرياضيات المختلفة: الجبر، الهندسة، التفاضل والتكامل، الإحصاء والاحتمالات، الرياضيات المنفصلة، بالإضافة إلى أساليب تدريس الرياضيات والدورات التعليمية. يركز البرنامج على تطوير مهارات التفكير المنطقي والتحليلي، حل المشكلات، واستخدام التكنولوجيات الحديثة وبرامج الرياضيات في التعليم، مع تدريب عملي في المدارس.',
      images: ['https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية'
    },
    {
      id: 5,
      name: 'برنامج تجهيز معلمي اللغة الألمانية والأدب',
      shortDescription: 'برنامج أكاديمي متخصص لتجهيز معلمي اللغة الألمانية والأدب',
      fullDescription: 'يهدف هذا البرنامج إلى تجهيز معلمين كفؤين في اللغة الألمانية والأدب، قادرين على تدريس اللغة الألمانية كلغة أجنبية بكفاءة عالية. يشمل البرنامج دراسة معمقة للأدب الألماني الكلاسيكي والمعاصر، قواعد اللغة الألمانية، الترجمة من وإلى الألمانية، الحضارة والثقافة الألمانية، بالإضافة إلى دورات تعليمية متخصصة في تدريس اللغات الأجنبية. يركز البرنامج على تطوير المهارات اللغوية الأربع، تزويد الطلاب بالكفاءة التواصلية باللغة الألمانية، واستخدام أساليب تدريس حديثة.',
      images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      category: 'اللغات',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية'
    },
    {
      id: 6,
      name: 'برنامج تجهيز معلمي الكيمياء',
      shortDescription: 'برنامج علمي متقدم لتجهيز معلمي الكيمياء بمهارات نظرية وعملية',
      fullDescription: 'يهدف البرنامج إلى تجهيز معلمي الكيمياء المتميزين الذين يجمعون بين المعرفة العلمية العميقة ومهارات التدريس الفعالة. يشمل البرنامج دراسة شاملة لجميع فروع الكيمياء: الكيمياء العامة، الكيمياء العضوية، الكيمياء غير العضوية، الكيمياء الفيزيائية، الكيمياء التحليلية، والكيمياء الحيوية، بالإضافة إلى أساليب تدريس الكيمياء والدورات التعليمية. يشمل البرنامج تدريبًا مكثفًا في المختبرات على التجارب العملية، تطوير مهارات البحث العلمي، واستخدام التكنولوجيات الحديثة في تدريس الكيمياء، مع التركيز على معايير السلامة في المختبر.',
      images: ['https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية'
    },
    {
      id: 7,
      name: 'برنامج تجهيز معلمي العلوم البيولوجية',
      shortDescription: 'برنامج متكامل لتجهيز معلمي العلوم البيولوجية بمعايير أكاديمية عالية',
      fullDescription: 'يهدف البرنامج إلى تجهيز معلمين متخصصين في العلوم البيولوجية، قادرين على تدريس البيولوجيا في فروعها المختلفة بكفاءة واحترافية. يشمل البرنامج دراسة معمقة في علم الحيوان، علم النبات، علم الأحياء الدقيقة، الوراثة، البيئة، التشريح والفسيولوجيا، البيولوجيا الجزيئية والخلوية، بالإضافة إلى أساليب تدريس العلوم البيولوجية والدورات التعليمية. يركز البرنامج على التدريب العملي في المختبرات والزيارات الميدانية، تطوير مهارات البحث العلمي، واستخدام التكنولوجيات الحديثة في تدريس علوم الحياة.',
      images: ['https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      category: 'العلوم',
      duration: '4 سنوات',
      degree: 'بكالوريوس التربية'
    }
  ];

  constructor() { }

  getAllPrograms(): Observable<Program[]> {
    return of(this.programs);
  }

  getProgramById(id: number): Observable<Program | undefined> {
    const program = this.programs.find(p => p.id === id);
    return of(program);
  }

  searchPrograms(searchTerm: string): Observable<Program[]> {
    if (!searchTerm.trim()) {
      return of(this.programs);
    }

    const filtered = this.programs.filter(program =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(filtered);
  }

  getNextProgram(currentId: number): Program | undefined {
    const currentIndex = this.programs.findIndex(p => p.id === currentId);
    if (currentIndex === -1 || currentIndex === this.programs.length - 1) {
      return this.programs[0];
    }
    return this.programs[currentIndex + 1];
  }

  getPreviousProgram(currentId: number): Program | undefined {
    const currentIndex = this.programs.findIndex(p => p.id === currentId);
    if (currentIndex === -1 || currentIndex === 0) {
      return this.programs[this.programs.length - 1];
    }
    return this.programs[currentIndex - 1];
  }
}
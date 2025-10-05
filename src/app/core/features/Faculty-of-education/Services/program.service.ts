import { Injectable } from '@angular/core';
import { Program } from '../model/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private newPrograms: Program[] = [
    {
      id: 'math-english',
      name: 'برنامج تدريب معلمي الرياضيات (باللغة الإنجليزية)',
      description: 'يهدف إلى تدريب معلمين متخصصين في تدريس الرياضيات باللغة الإنجليزية، وتزويدهم بمهارات تدريس حديثة وطرق التفكير التحليلي.',
      icon: 'pi pi-calculator',
      isNew: true
    },
    {
      id: 'biology-english',
      name: 'برنامج تدريب معلمي العلوم البيولوجية (باللغة الإنجليزية)',
      description: 'يركز على تخريج معلمين قادرين على تدريس الأحياء باللغة الإنجليزية باستخدام تقنيات تدريس مبتكرة ومعايير علمية متقدمة.',
      icon: 'pi pi-globe',
      isNew: true
    },
    {
      id: 'physics-english',
      name: 'برنامج تدريب معلمي الفيزياء (باللغة الإنجليزية)',
      description: 'يُعد الطلاب لإتقان تدريس الفيزياء باللغة الإنجليزية، مع تدريب عملي في المختبرات ودراسة أحدث المناهج الدولية.',
      icon: 'pi pi-bolt',
      isNew: true
    },
    {
      id: 'chemistry-english',
      name: 'برنامج تدريب معلمي الكيمياء (باللغة الإنجليزية)',
      description: 'يدرب معلمين متخصصين في تدريس الكيمياء باللغة الإنجليزية، مع التركيز على التجارب العملية والتطبيقات التعليمية الحديثة.',
      icon: 'pi pi-circle',
      isNew: true
    }
  ];

  private academicPrograms: Program[] = [
    {
      id: 'arabic-program',
      name: 'برنامج تدريب معلمي اللغة العربية والأدب',
      description: 'برنامج شامل لتدريب معلمي اللغة العربية مع التركيز على الأدب وأساليب التدريس الحديثة.',
      icon: 'pi pi-book'
    },
    {
      id: 'english-program',
      name: 'برنامج تدريب معلمي اللغة الإنجليزية والأدب',
      description: 'برنامج متقدم لتدريس اللغة الإنجليزية مع التركيز على مهارات التواصل والأدب.',
      icon: 'pi pi-globe'
    },
    {
      id: 'french-program',
      name: 'برنامج تدريب معلمي اللغة الفرنسية والأدب',
      description: 'برنامج متخصص لتدريس اللغة الفرنسية ودراسات الثقافة.',
      icon: 'pi pi-flag'
    },
    {
      id: 'german-program',
      name: 'برنامج تدريب معلمي اللغة الألمانية والأدب',
      description: 'برنامج شامل لتدريس اللغة الألمانية باستخدام أساليب تربوية حديثة.',
      icon: 'pi pi-flag'
    },
    {
      id: 'mathematics-program',
      name: 'برنامج تدريب معلمي الرياضيات',
      description: 'برنامج تعليم رياضي متقدم مع التركيز على حل المشكلات والتفكير التحليلي.',
      icon: 'pi pi-calculator'
    },
    {
      id: 'chemistry-program',
      name: 'برنامج تدريب معلمي الكيمياء',
      description: 'برنامج علمي يركز على العمل في المختبرات والتعليم العملي للكيمياء.',
      icon: 'pi pi-circle'
    },
    {
      id: 'biology-program',
      name: 'برنامج تدريب معلمي العلوم البيولوجية',
      description: 'برنامج تعليمي شامل للأحياء مع التركيز على علوم الحياة والبحث.',
      icon: 'pi pi-globe'
    }
  ];

  getNewPrograms(): Program[] {
    return this.newPrograms;
  }

  getAcademicPrograms(): Program[] {
    return this.academicPrograms;
  }

  getAllPrograms(): Program[] {
    return [...this.newPrograms, ...this.academicPrograms];
  }

  getProgramById(id: string): Program | undefined {
    return this.getAllPrograms().find(program => program.id === id);
  }

  getProgramsByType(isNew: boolean): Program[] {
    return isNew ? this.newPrograms : this.academicPrograms;
  }
}
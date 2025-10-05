import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VisionMission, ObjectiveItem, VisionMissionItem } from '../model/vision-mission.model';

@Injectable({
  providedIn: 'root'
})
export class VisionMissionService {
  // بيانات VisionMission (من الخدمة الأولى)
  private visionMission: VisionMission = {
    vision: 'تجهيز معلمين متميزين يمتلكون مهارات تربوية وتعليمية بالكفاءة والفعالية، وفقًا للتوجهات الحالية والمستقبلية في مجال التعليم.',
    mission: 'تسعى الكلية إلى تلبية احتياجات سوق العمل التعليمي من خلال تجهيز معلمين متميزين قادرين على تأهيل جيل يمكنه التعامل مع التحديات الحالية والمستقبلية، استنادًا إلى المعايير الوطنية وبالتزامن مع رؤية مصر 2030.',
    objectives: [
      'تعزيز مهارات التواصل الفعال مع الطلاب والمجتمع الخارجي.',
      'توفير فرص للتعلم المستمر وتطوير المهارات اللازمة للمعلمين.',
      'تعزيز الوعي بالقيم الأخلاقية والاجتماعية المرتبطة بالمهنة التعليمية.',
      'تأهيل الباحثين للحصول على تراخيص التدريس للمراحل التعليمية المختلفة.',
      'تعزيز الفهم العميق لمبادئ وأسس التدريس والتعلم الناجح.',
      'تزويد الباحثين بالمعرفة والمهارات اللازمة لتحقيق التعلم الفعال.'
    ]
  };

  private objectiveItems: ObjectiveItem[] = [
    {
      id: 1,
      text: 'تعزيز مهارات التواصل الفعال مع الطلاب والمجتمع الخارجي.',
      icon: 'pi pi-comments'
    },
    {
      id: 2,
      text: 'توفير فرص للتعلم المستمر وتطوير المهارات اللازمة للمعلمين.',
      icon: 'pi pi-book'
    },
    {
      id: 3,
      text: 'تعزيز الوعي بالقيم الأخلاقية والاجتماعية المرتبطة بالمهنة التعليمية.',
      icon: 'pi pi-heart'
    },
    {
      id: 4,
      text: 'تأهيل الباحثين للحصول على تراخيص التدريس للمراحل التعليمية المختلفة.',
      icon: 'pi pi-verified'
    },
    {
      id: 5,
      text: 'تعزيز الفهم العميق لمبادئ وأسس التدريس والتعلم الناجح.',
      icon: 'pi pi-lightbulb'
    },
    {
      id: 6,
      text: 'تزويد الباحثين بالمعرفة والمهارات اللازمة لتحقيق التعلم الفعال.',
      icon: 'pi pi-cog'
    }
  ];

  // بيانات VisionMissionItems (من الخدمة الثانية)
  private items: VisionMissionItem[] = [
    {
      id: 'vision',
      title: 'الرؤية',
      icon: 'pi pi-eye',
      gradient: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)'
    },
    {
      id: 'mission',
      title: 'الرسالة',
      icon: 'pi pi-flag',
      gradient: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-hover) 100%)'
    },
    {
      id: 'objectives',
      title: 'الأهداف',
      icon: 'pi pi-bullseye',
      gradient: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)'
    }
  ];

  // الطرق من الخدمة الأولى
  getVisionMission(): Observable<VisionMission> {
    return of(this.visionMission);
  }

  getObjectiveItems(): Observable<ObjectiveItem[]> {
    return of(this.objectiveItems);
  }

  // الطرق من الخدمة الثانية
  getVisionMissionItems(): VisionMissionItem[] {
    return this.items;
  }

  getItemById(id: string): VisionMissionItem | undefined {
    return this.items.find(item => item.id === id);
  }
}
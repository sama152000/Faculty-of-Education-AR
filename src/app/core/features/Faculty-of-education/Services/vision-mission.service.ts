import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VisionMission, ObjectiveItem, VisionMissionItem } from '../model/vision-mission.model';

@Injectable({
  providedIn: 'root'
})
export class VisionMissionService {
  // Data for VisionMission
  private visionMission: VisionMission = {
    vision: 'إعداد معلمين متميزين يمتلكون مهارات تربوية وتعليمية بكفاءة وفعالية، بما يتماشى مع الاتجاهات الحالية والمستقبلية في مجال التعليم.',
    mission: 'تسعى الكلية لتلبية احتياجات سوق العمل التربوي من خلال إعداد معلمين متميزين قادرين على تأهيل جيل يستطيع مواجهة التحديات الحالية والمستقبلية، بناءً على المعايير الوطنية ومتوافقة مع رؤية مصر 2030.',
    objectives: [
      'تعزيز مهارات التواصل الفعال مع الطلاب والمجتمع الخارجي.',
      'توفير فرص التعلم المستمر وتطوير المهارات اللازمة للمعلمين.',
      'تعزيز الوعي بالقيم الأخلاقية والاجتماعية المرتبطة بمهنة التعليم.',
      'تأهيل الباحثين للحصول على تراخيص التدريس لمختلف المراحل التعليمية.',
      'تعزيز الفهم العميق لمبادئ وأسس التعليم والتعلم الناجح.',
      'تزويد الباحثين بالمعرفة والمهارات اللازمة لتحقيق تعلم فعال.'
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
      text: 'توفير فرص التعلم المستمر وتطوير المهارات اللازمة للمعلمين.',
      icon: 'pi pi-book'
    },
    {
      id: 3,
      text: 'تعزيز الوعي بالقيم الأخلاقية والاجتماعية المرتبطة بمهنة التعليم.',
      icon: 'pi pi-heart'
    },
    {
      id: 4,
      text: 'تأهيل الباحثين للحصول على تراخيص التدريس لمختلف المراحل التعليمية.',
      icon: 'pi pi-verified'
    },
    {
      id: 5,
      text: 'تعزيز الفهم العميق لمبادئ وأسس التعليم والتعلم الناجح.',
      icon: 'pi pi-lightbulb'
    },
    {
      id: 6,
      text: 'تزويد الباحثين بالمعرفة والمهارات اللازمة لتحقيق تعلم فعال.',
      icon: 'pi pi-cog'
    }
  ];

  // Data for VisionMissionItems
  private items: VisionMissionItem[] = [
    {
      id: 'vision',
      title: 'الرؤية',
      icon: 'pi pi-eye',
      content: 'إعداد معلمين متميزين يمتلكون مهارات تربوية وتعليمية بكفاءة وفعالية، بما يتماشى مع الاتجاهات الحالية والمستقبلية في مجال التعليم.',
      gradient: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)'
    },
    {
      id: 'mission',
      title: 'الرسالة',
      icon: 'pi pi-flag',
      content: 'تسعى الكلية لتلبية احتياجات سوق العمل التربوي من خلال إعداد معلمين متميزين قادرين على تأهيل جيل يستطيع مواجهة التحديات الحالية والمستقبلية، بناءً على المعايير الوطنية ومتوافقة مع رؤية مصر 2030.',
      gradient: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-hover) 100%)'
    },
    {
      id: 'objectives',
      title: 'الأهداف',
      icon: 'pi pi-bullseye',
      content: 'تعزيز مهارات التواصل الفعال مع الطلاب والمجتمع الخارجي. توفير فرص التعلم المستمر وتطوير المهارات اللازمة للمعلمين.',
      gradient: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)'
    }
  ];

  // Methods from the first service
  getVisionMission(): Observable<VisionMission> {
    return of(this.visionMission);
  }

  getObjectiveItems(): Observable<ObjectiveItem[]> {
    return of(this.objectiveItems);
  }

  // Methods from the second service
  getVisionMissionItems(): VisionMissionItem[] {
    return this.items;
  }

  getItemById(id: string): VisionMissionItem | undefined {
    return this.items.find(item => item.id === id);
  }
}
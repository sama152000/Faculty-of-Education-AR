import { Injectable } from '@angular/core';
import { JournalInfo } from '../model/journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private journalInfo: JournalInfo = {
    title: 'مجلة العلوم التربوية – كلية التربية، جامعة الأقصر',
    description: 'مجلة العلوم التربوية هي مجلة علمية محكمة تصدر عن كلية التربية – جامعة الأقصر. تهدف إلى نشر الأبحاث والدراسات التربوية الأصلية التي تساهم في تطوير الفكر والممارسة التعليمية، مع الالتزام بمعايير الجودة الأكاديمية العالية والنزاهة العلمية.',
    url: 'https://jedul.journals.ekb.eg/',
    icon: 'pi pi-file-pdf'
  };

  getJournalInfo(): JournalInfo {
    return this.journalInfo;
  }

  updateJournalInfo(info: Partial<JournalInfo>): void {
    this.journalInfo = { ...this.journalInfo, ...info };
  }

  openJournal(): void {
    window.open(this.journalInfo.url, '_blank');
  }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactInfo: any = {
    address:
      'كلية التربية – جامعة الأقصر – الأقصر – مدينة طيبة الجديدة، بجوار هيئة مدينة طيبة الجديدة',
    email: 'waleed2507@yahoo.co.uk',
    phone: '01010577677',
    socialMedia: [
      {
        platform: 'فيسبوك',
        url: 'https://www.facebook.com/profile.php?id=61564395931625',
        icon: 'pi pi-facebook',
        color: '#1877F2',
      },
      {
        platform: 'فيسبوك الجامعة',
        url: 'https://www.facebook.com/LuxorUniversityOfficial/?locale=ar_AR',
        icon: 'pi pi-facebook',
        color: '#1877F2',
      },
    ],
    importantLinks: [
      {
        title: 'موقع الجامعة الرسمي لجامعة الأقصر',
        url: 'http://www.luxor.edu.eg/#/',
        description:
          'الوصول إلى البوابة الرئيسية للجامعة للحصول على معلومات شاملة',
        icon: 'pi pi-globe',
      },
      {
        title: 'فيسبوك جامعة الأقصر',
        url: 'https://www.facebook.com/LuxorUniversityOfficial/?locale=ar_AR',
        description: 'تابع التحديثات والإعلانات الخاصة بالجامعة',
        icon: 'pi pi-facebook',
      },
      {
        title: 'فيسبوك كلية التربية',
        url: 'https://www.facebook.com/profile.php?id=61564395931625',
        description: 'تواصل مع مجتمع كليتنا',
        icon: 'pi pi-facebook',
      },
    ],
  };

  getContactInfo(): Observable<any> {
    return of(this.contactInfo);
  }

  sendMessage(messageData: any): Observable<boolean> {
    console.log('تم إرسال الرسالة:', messageData);
    return of(true);
  }
}

import { Injectable } from '@angular/core';
import { HeroContent, HeroSlide } from '../model/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroContent: HeroContent = {
    slides: [
      {
        id: '1',
        image: './assets/slide3.jpg',
        title: 'تجهيز معلمين متميزين لمستقبل تعليمي أفضل',
        description: 'كلية التربية – جامعة الأقصر، بيئة أكاديمية متكاملة لتجهيز المعلمين المستقبليين وفق أحدث معايير الجودة.',
        buttonText: 'اعرف المزيد',
        buttonLink: '/about'
      },
      {
        id: '2',
        image: './assets/slide2.jpg',
        title: 'التميز في تدريب المعلمين',
        description: 'اكتشف برامجنا الشاملة المصممة لتشكيل جيل المعلمين التالي باستخدام منهجيات تدريس حديثة.',
        buttonText: 'استكشف البرامج',
        buttonLink: '/programs'
      },
      {
        id: '3',
        image: './assets/slide1.jpg',
        title: 'الابتكار في الأبحاث التعليمية',
        description: 'انضم إلى مجتمع أبحاثنا المكرس لتطوير الممارسات التعليمية من خلال البحث والتطوير المتطور.',
        buttonText: 'مركز الأبحاث',
        buttonLink: '/research'
      }
    ],
    autoSlideInterval: 5000
  };

  getHeroContent(): HeroContent {
    return this.heroContent;
  }

  getHeroSlides(): HeroSlide[] {
    return this.heroContent.slides;
  }
}
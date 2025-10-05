import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsEvent, NewsEventFilter, NewsEventResponse } from '../model/news-event.model';

@Injectable({
  providedIn: 'root'
})
export class NewsEventService {
  private newsEvents: NewsEvent[] = [
    {
      id: '1',
      type: 'event',
      title: 'حفل استقبال الطلاب الجدد – العام الدراسي 2024/2025',
      excerpt: 'نظمت كلية التربية أول اجتماع توجيهي للطلاب في السنة الأولى برعاية أ.د. سابرين عبد الجليل.',
      content: `برعاية **أ.د. سابرين عبد الجليل**، رئيسة جامعة الأقصر، و**أ.د. وليد محمد عبد الله**، عميد كلية التربية، وكجزء من التحضيرات للعام الدراسي الجديد، نظمت كلية التربية – جامعة الأقصر أول اجتماع توجيهي للطلاب في السنة الأولى (برنامج التعليم العام – نظام الساعات المعتمدة، اللوائح الموحدة). أقيم الحفل يوم الأحد، 29 سبتمبر، في قاعة الكلية الكبرى.

حضر الاحتفال العميد والوكلاء وأعضاء هيئة التدريس. بدأ البرنامج بالنشيد الوطني، تلاه تلاوة من القرآن الكريم. ثم القى العميد كلمة ترحيبية شدد فيها على أهمية الانضباط، الإنجاز الأكاديمي، والمشاركة النشطة في أنشطة الكلية، مؤكدًا أن مكتبه مفتوح دائمًا للطلاب.

شمل الحفل عروضًا فنية وطنية قدمها الطلاب، حيث ساهم فريق "طلاب من أجل مصر" في تنظيم أنشطة الاستقبال. تم توزيع كتيبات توعية عن أقسام وبرامج الكلية، وتم الرد على استفسارات الطلاب حول التخصصات، جدول الحصص، وإجراءات تسجيل المقررات.

تميز الحفل بأجواء من الفرح والحماس، مع تفاعل إيجابي قوي من الحاضرين، مما يعكس روح العائلة والانتماء داخل الكلية.`,
      date: new Date('2024-09-29'),
      images: [
        './assets/new1.png',
        './assets/new2.png',
        './assets/new3.png',
        './assets/new4.png',

      ],
      featured: true,
      category: 'شؤون الطلاب'
    },
    {
      id: '2',
      type: 'news',
      title: 'احتفال كلية التربية بالذكرى 51 لنصر أكتوبر المجيد',
      excerpt: 'نظمت الكلية احتفالية لتكريم بداية العام الدراسي الجديد والذكرى 51 لنصر أكتوبر.',
      content: `برعاية **أ.د. سابرين عبد الجليل**، رئيسة جامعة الأقصر، وبرئاسة **أ.د. وليد محمد عبد الله**، عميد كلية التربية، وبتنظيم ومشاركة فريق *طلاب من أجل مصر*، نظمت كلية التربية احتفالية لتكريم بداية العام الدراسي الجديد والذكرى 51 لنصر أكتوبر.

حضر الحفل عدد من عمداء ووكلاء الكليات، وأعضاء هيئة التدريس، والعقيد محمد جمال، الضابط العسكري المسؤول. بدأ الاحتفال بالنشيد الوطني، تلاه آيات من القرآن الكريم. ألقى أ.د. وليد محمد عبد الله، عميد الكلية، كلمة ترحيبية هنأ فيها الطلاب وأكد دعم الكلية الكامل لهم.

كما ألقت أ.د. سابرين كلمة وطنية تعبر عن فخرها بهذا النصر التاريخي، وحثت الطلاب على الحفاظ على الانضباط والمشاركة الإيجابية في الأنشطة الأكاديمية واللامنهجية.

شهد الحفل عروضًا فنية، بما في ذلك عرض **رقص التنورة**، وأناشيد وطنية، وتلاوات دينية بأداء المنشد محمد عباس. اختتم الحفل بتصوير صور تذكارية مع الحاضرين.`,
      date: new Date('2024-10-09'),
      images: [
        './assets/october.jpg',
        './assets/october3.jpg',
        './assets/october2.jpg',
      ],
      featured: true,
      category: 'فعاليات الجامعة'
    },
    
    {
      id: '5',
      type: 'event',
      title: 'اللقاء التعريفي لطلاب الدبلومة العامة في التربية (جميع المسارات) بنظام الساعات المعتمدة',
      excerpt: 'لقاء تعريفي لطلاب الدبلومة العامة في التربية بنظام الساعات المعتمدة.',
      content: `تحت رعاية معالي الأستاذة الدكتورة صابرين عبدالجليل رئيس الجامعة، وريادة الأستاذ الدكتور وليد محمد عبدالله عميد الكلية، نظّمت كلية التربية – جامعة الأقصر، يوم الأربعاء الموافق 23 أكتوبر 2024، اللقاء التعريفي لطلاب الدبلومة العامة في التربية (جميع المسارات) بنظام الساعات المعتمدة. تناول اللقاء التعريف بنظام الدراسة، ومواعيد المحاضرات، وآليات التسجيل والإرشاد الأكاديمي، ودور المرشد الأكاديمي في التوجيه والدعم، إلى جانب شرح نظام التقييم، وتنفيذ التدريب الميداني، وآلية التشعيب واختيار المسارات، وكيفية احتساب النقاط لكل ساعة معتمدة. كما تم توضيح خطوات تسجيل المقررات داخل استمارة التسجيل لكل مسار. حاضر في اللقاء أ.د/ وليد محمد عبدالله، وأ.د/ ممدوح كامل حساني، بحضور د/ شفاء محمد حسين، ود/ محمد عطا نجدي، ومسؤولي الدراسات العليا بالكلية، ولفيف من طلاب الدبلومة.`,
      date: new Date('2024-10-23'),
      images: [
        './assets/newstu1.jpg',
        './assets/newstu2.jpg',
      ],
      featured: true,
      category: 'شؤون الطلاب'
    },
    {
      id: '6',
      type: 'event',
      title: 'مشاركة كلية التربية بالأقصر في الندوة التعريفية عن برامج التبادل الثقافي المقدمة من السفارة الأمريكية بالقاهرة',
      excerpt: 'ورشة عمل حول برامج التبادل الثقافي المقدمة من السفارة الأمريكية.',
      content: `تحت رعاية معالي أ.د/ صابرين عبدالجليل رئيس الجامعة، وريادة أ.د/ وليد عبدالله عميد كلية التربية، شاركت الكلية يوم الإثنين 28 أكتوبر 2024 في ورشة عمل بعنوان: "برامج التبادل الثقافي المقدمة من السفارة الأمريكية بالقاهرة"، بحضور ممثلي السفارة من الجانبين الأمريكي والمصري. تناولت الورشة أهم المنح المتاحة، مثل SUSI وGlobal UGRAD، ودور برامج السفارة في تنمية مهارات اللغة الإنجليزية والتدريس والكتابة الأكاديمية. كما تم التعريف بخدمات المكتب الثقافي ومكتب "الريلو" RELO. مثّلت الكلية د/ شفاء محمد حسين، مدرس المناهج وطرق التدريس، إلى جانب مشاركة متميزة من طلاب الفرقة الأولى: أحمد يوسف (فيزياء)، هند إبراهيم (كيمياء)، وأمل مكاوي (رياضيات). واختتمت الورشة بعرض تجربة ناجحة لطالبة من جامعة الأقصر سبق أن حصلت على منحة أمريكية، ما لاقى تفاعلًا واسعًا من الحضور.`,
      date: new Date('2024-10-28'),
      images: [
        './assets/calnew.jpg',
        './assets/calnew2.jpg',
        ],
      featured: true,
      category: 'فعاليات الجامعة'
    },
    {
      id: '7',
      type: 'event',
      title: 'استقبال كلية التربية قافلة حملة التبرع بالدم بالتعاون مع بنك الدم التابع للهلال الأحمر بفرع الأقصر',
      excerpt: 'حملة تبرع بالدم بالتعاون مع الهلال الأحمر بفرع الأقصر.',
      content: `في إطار حرص كلية التربية – جامعة الأقصر على تفعيل دورها المجتمعي، استقبلت الكلية قافلة حملة التبرع بالدم بالتعاون مع بنك الدم التابع للهلال الأحمر بفرع الأقصر، وذلك يوم الخميس 7 نوفمبر 2024. جاءت الحملة تحت رعاية أ.د/ صابرين عبدالجليل رئيس الجامعة، وريادة أ.د/ وليد محمد عبدالله عميد الكلية، وإشراف أ.د/ حسن تهامي عبداللاه وكيل الكلية لشئون خدمة المجتمع وتنمية البيئة. شارك في الحملة عدد كبير من طلاب وطالبات الكلية الذين أبدوا حماسًا للتبرع بالدم دعمًا للمرضى والمحتاجين، مما يعكس وعيهم وروحهم التطوعية. تم تنظيم الحملة وسط التزام تام بالإجراءات الصحية والاحترازية، حرصًا على سلامة الجميع. وقد لاقت القافلة ترحيبًا واسعًا من إدارة الكلية، واختُتمت أعمالها في الساعة الثانية ظهرًا في أجواء من التعاون والرضا، مع وعد بتكرارها مستقبلًا دعمًا لدور الكلية في خدمة المجتمع والبيئة.`,
      date: new Date('2024-11-07'),
      images: [
         './assets/blod1.jpg',
         './assets/blod2.jpg',
         './assets/blod3.jpg',
 
       ],
      featured: true,
      category: 'خدمة المجتمع'
    }
  ];

  getNewsEvents(filter?: NewsEventFilter, page: number = 1, pageSize: number = 6): Observable<NewsEventResponse> {
    let filteredItems = [...this.newsEvents];

    if (filter) {
      if (filter.type && filter.type !== 'all') {
        filteredItems = filteredItems.filter(item => item.type === filter.type);
      }
      
      if (filter.dateFrom) {
        filteredItems = filteredItems.filter(item => item.date >= filter.dateFrom!);
      }
      
      if (filter.dateTo) {
        filteredItems = filteredItems.filter(item => item.date <= filter.dateTo!);
      }
      
      if (filter.category) {
        filteredItems = filteredItems.filter(item => item.category === filter.category);
      }
    }

    // Sort by date (newest first)
    filteredItems.sort((a, b) => b.date.getTime() - a.date.getTime());

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    return of({
      items: paginatedItems,
      total: filteredItems.length,
      page,
      pageSize
    });
  }

  getNewsEventById(id: string): Observable<NewsEvent | null> {
    const item = this.newsEvents.find(item => item.id === id);
    return of(item || null);
  }

  getRelatedItems(currentId: string, type: 'news' | 'event', limit: number = 5): Observable<NewsEvent[]> {
    const relatedItems = this.newsEvents
      .filter(item => item.id !== currentId && item.type === type)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
    
    return of(relatedItems);
  }

  getNextItem(currentId: string): Observable<NewsEvent | null> {
    const currentIndex = this.newsEvents.findIndex(item => item.id === currentId);
    if (currentIndex === -1 || currentIndex === this.newsEvents.length - 1) {
      return of(null);
    }
    return of(this.newsEvents[currentIndex + 1]);
  }

  getPreviousItem(currentId: string): Observable<NewsEvent | null> {
    const currentIndex = this.newsEvents.findIndex(item => item.id === currentId);
    if (currentIndex === -1 || currentIndex === 0) {
      return of(null);
    }
    return of(this.newsEvents[currentIndex - 1]);
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.newsEvents.map(item => item.category).filter(Boolean))];
    return of(categories as string[]);
  }
}
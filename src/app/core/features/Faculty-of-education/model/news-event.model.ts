export interface NewsEvent {
  id: string;
  type: 'news' | 'event';
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  images: string[];
  featured: boolean;
  category?: string;
}

export interface NewsEventFilter {
  type?: 'news' | 'event' | 'all';
  dateFrom?: Date;
  dateTo?: Date;
  category?: string;
}

export interface NewsEventResponse {
  items: NewsEvent[];
  total: number;
  page: number;
  pageSize: number;
}
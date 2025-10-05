export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  socialMedia: SocialMediaLink[];
  importantLinks: ImportantLink[];
}

export interface SocialMediaLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface ImportantLink {
  title: string;
  url: string;
  description: string;
  icon: string;
}
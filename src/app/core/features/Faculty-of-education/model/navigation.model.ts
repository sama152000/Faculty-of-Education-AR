export interface NavItem {
  id: string;
  label: string;
  route?: string;
  external?: boolean;
  url?: string;
  children?: NavItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  emails: {
    dean: string;
    journal: string;
  };
}
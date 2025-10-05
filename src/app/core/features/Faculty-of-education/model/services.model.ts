export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: Service[];
  deliveryMethods: DeliveryMethod[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface DeliveryMethod {
  id: string;
  method: string;
  icon: string;
}

export interface StatisticTab {
  id: string;
  title: string;
  data: StatisticItem[];
}

export interface StatisticItem {
  label: string;
  value: number;
  subItems?: StatisticSubItem[];
}

export interface StatisticSubItem {
  label: string;
  male: number;
  female: number;
  total: number;
}

export interface StaffMember {
  id: number;
  name: string;
  position: string;
  phone: string;
  email?: string;
  department?: string;
}
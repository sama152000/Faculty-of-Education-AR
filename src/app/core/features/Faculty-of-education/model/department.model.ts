export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  viceDean: string;
  subjects: string[];
  objectives: string[];
  services: string[];
  route: string;
}

export interface DepartmentNavigation {
  previous: Department | null;
  next: Department | null;
}
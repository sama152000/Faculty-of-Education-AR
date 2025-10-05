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
}

export interface DepartmentNavigation {
  currentIndex: number;
  totalDepartments: number;
  previousDepartment?: Department;
  nextDepartment?: Department;
}
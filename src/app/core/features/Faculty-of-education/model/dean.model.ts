export interface DeanInfo {
  name: string;
  title: string;
  photo: string;
  message: string;
  signature?: string;
}

export interface FacultyHistory {
  establishmentDate: string;
  decree: string;
  academicYear: string;
  programs: string[];
  facilities: string[];
  description: string;
}
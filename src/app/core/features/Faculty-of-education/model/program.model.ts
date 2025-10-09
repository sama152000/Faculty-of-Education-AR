export interface Program {
  id: string;  // غيرت لـ string عشان توافق مع الجديد
  name: string;
  shortDescription?: string;  // optional لو مفيش
  fullDescription?: string;   // optional
  description?: string;       // من الجديد، optional
  images: string[];           // array، لو مفيش استخدمي empty array
  category: string;
  duration: string;
  degree: string;
  icon?: string;              // من الجديد
  isNew?: boolean;            // optional، true للجديد
}
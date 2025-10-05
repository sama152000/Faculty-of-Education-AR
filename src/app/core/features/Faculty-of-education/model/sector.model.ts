export interface Sector {
  id: string;
  title: string;
  viceDean: string;
  objectives: string[];
  services: string[];
  route: string;
  order: number;
}

export interface SectorNavigation {
  previous: Sector | null;
  next: Sector | null;
}